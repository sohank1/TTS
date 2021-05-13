import { HttpException, HttpService, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as jwt from "jsonwebtoken";
import { User } from "../user/user.schema";
import { Model } from "mongoose";
import { getTag } from "../user/util/get-tag.util";
// import { EventsGateway } from "../events/events.gateway";
import { getAvatarUrl } from "../user/util/get-avatar-url.util";
import { Request, Response } from "express";
import { environment, IS_TEST } from "../environment/environment";
import { UserService } from "../user/user.service";
import { Guild } from "../guild/guild.schema";
import { getIconUrl } from "../guild/util/get-icon.util";
import { UserResponseObject } from "src/user/types/UserResponseObject";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const DiscordOauth = require("discord-oauth2");

@Injectable()
export class AuthService {
    public oauth = new DiscordOauth({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: environment.REDIRECT_URL,
        version: "v8",
    });

    constructor(
        @InjectModel(User.name)
        private UserModel: Model<User>,
        @InjectModel(Guild.name)
        private GuildModel: Model<Guild>,
        // private events: EventsGateway,
        private _userService: UserService,
        private _http: HttpService
    ) {}

    public async validateUser(data: {
        id: string;
        username: string;
        avatar: string;
        discriminator: string;
    }): Promise<User> {
        try {
            // await this.GuildModel.create({ iconUrl: '', members: [], name: '', roles: [] });
            const tts = await this.fetchUsers();
            await this.fetchGuild(tts);

            const user = await this.UserModel.findOne({ id: data.id });
            if (user) {
                const url = getAvatarUrl(data.id, data.avatar);
                const tag = getTag(data.username, data.discriminator);

                if (user.avatarUrl === url && user.tag === tag) return user;

                user.avatarUrl = url.includes("null")
                    ? "https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png"
                    : url;
                user.tag = tag;

                await user.save();
                // this.events.emitUserUpdate(this._userService.toResponseObject(user));
                return user;
            } else {
                const url = getAvatarUrl(data.id, data.avatar);

                const newUser = new this.UserModel({
                    id: data.id,
                    tag: getTag(data.username, data.discriminator),
                    avatarUrl: url.includes("null")
                        ? "https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png"
                        : url,
                });

                await newUser.save();
                // this.events.emitNewUser(this._userService.toResponseObject(newUser));
            }
        } catch (err) {
            console.log(err);
        }
    }
    public async login(res: Response): Promise<void> {
        res.redirect(
            this.oauth.generateAuthUrl({
                scope: ["identify", "guilds"],
                prompt: "none",
            })
        );
    }

    public async redirect(req: Request, res: Response): Promise<void> {
        const { access_token: discordAccessToken } = await this.oauth.tokenRequest({
            code: req.query.code,
            grantType: "authorization_code",
            scope: ["identify", "guilds"],
        });
        const user = await this.oauth.getUser(discordAccessToken);
        // if someone is trying to login as test user in prod take them back to home page
        if (!IS_TEST && user.id === "688374951660486661") return res.redirect(environment.CLIENT_BASE_URL);

        await this.validateUser(user);

        res.redirect(
            `${environment.CLIENT_BASE_URL}/save?accessToken=${this._signAccessToken(
                user.id
            )}&refreshToken=${this._signRefreshToken(user.id)}`
        );
    }

    public logout(req: Request, res: Response): void {
        if (!req.user) throw new HttpException("Cannot logout when not logged in.", HttpStatus.BAD_REQUEST);
        // this.events.emitUserLogout(<User>req.user);
        req.logOut();

        req.query.redirect ? res.redirect(<string>req.query.redirect) : res.redirect(environment.CLIENT_BASE_URL);
    }

    public me(
        accessToken: string,
        refreshToken: string,
        fetchUser = true
    ): Promise<{
        user: UserResponseObject;
        raw: {
            userId: string;
            type: "success" | "refresh" | "error";
            tokens?: { accessToken: string; refreshToken: string };
        };
    }> {
        return new Promise(async (res, rej) => {
            try {
                const raw = await this.validateTokens(accessToken, refreshToken);
                res({ user: fetchUser ? await this._userService.get(raw.userId) : null, raw });
            } catch (err) {
                rej(err);
            }
        });
    }

    public async validateTokens(
        accessToken: string,
        refreshToken: string
    ): Promise<{
        userId: string;
        type: "success" | "refresh" | "error";
        tokens?: { accessToken: string; refreshToken: string };
    }> {
        return new Promise((res, rej) => {
            let r: { userId?: string; type: "refresh" };
            let a: { userId?: string; type: "access" };

            try {
                r = jwt.verify(refreshToken, process.env.JWT_SECERT) as any;
                a = jwt.verify(accessToken, process.env.JWT_SECERT) as any;

                if (a?.type === "access")
                    res({
                        type: "success",
                        userId: a.userId,
                    });

                rej("failed");
            } catch (err) {
                console.log("a and r in catch", a, r)
                if (a?.type === "access" && r?.type === "refresh" && a?.userId === r?.userId)
                    res({
                        type: "refresh",
                        userId: r.userId,
                        tokens: {
                            accessToken: this._signAccessToken(r.userId),
                            refreshToken,
                        },
                    });

                rej("failed");
            }
        });
    }

    private _signAccessToken(userId: string): string {
        return jwt.sign({ userId, type: "access" }, process.env.JWT_SECERT, { expiresIn: "5m" });
    }

    private _signRefreshToken(userId: string): string {
        return jwt.sign({ userId, type: "refresh" }, process.env.JWT_SECERT, { expiresIn: "30d" });
    }

    public async fetchUsers(): Promise<Guild> {
        const tts = await this.GuildModel.findOne();

        this._http
            .get(`https://discord.com/api/v8/guilds/${environment.TTS_DISCORD_SERVER_ID}/members?limit=1000`, {
                headers: {
                    Authorization: `Bot ${process.env.BOT_TOKEN}`,
                },
            })
            .subscribe(async (r) => {
                tts.members = [];
                for (const m of r.data)
                    if (!m.user.bot) {
                        const roles = m.roles.map((id: string) => tts.roles.find((r) => r.id === id));

                        tts.members.push({
                            id: m.user.id,
                            username: m.user.username,
                            discriminator: m.user.discriminator,
                            bot: m.user.bot ? true : false,
                            roles,
                            joinedAt: new Date(m.joined_at),
                        });
                    }
            });
        return tts;
    }

    public async fetchGuild(tts: Guild): Promise<void> {
        this._http
            .get(`https://discord.com/api/v8/guilds/${environment.TTS_DISCORD_SERVER_ID}`, {
                headers: {
                    Authorization: `Bot ${process.env.BOT_TOKEN}`,
                },
            })

            .subscribe(async (r) => {
                for (const role of r.data.roles) {
                    role.color = `#${role.color.toString(16).padStart(6, "0")}`;
                }

                tts.id = r.data.id;
                tts.name = r.data.name;
                tts.iconUrl = getIconUrl(tts.id, r.data.icon);
                tts.roles = r.data.roles;

                await tts.updateOne(tts);
                await tts.save();
            });
    }

    public async loginWithTestUser(
        type: "tokens",
        res: Response
    ): Promise<void | { accessToken: string; refreshToken: string }> {
        if (!IS_TEST) throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);

        let user = await this.UserModel.findOne();
        if (!user) {
            user = await this.UserModel.create({
                id: "688374951660486661",
                tag: "Test1#2277",
                avatarUrl: "https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png",
            });
        }

        const d = {
            accessToken: this._signAccessToken(user.id),
            refreshToken: this._signRefreshToken(user.id),
        };

        if (type === "tokens") return d;

        return res.redirect(
            `${environment.CLIENT_BASE_URL}/save?accessToken=${d.accessToken}&refreshToken=${d.refreshToken}`
        );
    }

    // public async login(res: Response): Promise<void> {
    //     // res.redirect(environment.OAUTH_URL);
    // }
}
