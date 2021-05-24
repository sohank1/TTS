import { forwardRef, HttpException, HttpService, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as jwt from "jsonwebtoken";
import { User } from "../user/user.schema";
import { Model } from "mongoose";
import { getTag } from "../user/util/get-tag.util";
import { WebSocketGateway } from "../ws/websocket.gateway";
import { getAvatarUrl } from "../user/util/get-avatar-url.util";
import { Request, Response } from "express";
import { environment, IS_TEST, TTS_BOT } from "../environment/environment";
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
        @Inject(forwardRef(() => WebSocketGateway))
        private _ws: WebSocketGateway,
        private _userService: UserService,
        private _http: HttpService
    ) {}

    public async validateUser(data: {
        id: string;
        username: string;
        avatar: string;
        discriminator: string;
    }): Promise<User | "redirect"> {
        try {
            // await this.GuildModel.create({ iconUrl: '', members: [], name: '', roles: [] });
            const tts = await this.fetchUsers();
            const g = await this.fetchGuild(tts);

            if (!g.members.some((m) => m.id === data.id)) return "redirect";

            const user = await this.UserModel.findOne({ id: data.id });
            if (user) {
                const url = getAvatarUrl(data.id, data.avatar);
                const tag = getTag(data.username, data.discriminator);

                if (user.avatarUrl === url && user.tag === tag) return user;

                user.avatarUrl = url.includes("null")
                    ? "https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png"
                    : url;
                user.tag = tag;

                this._ws.connectionHandler.emitUserUpdate(this._userService.toResponseObject(user));
                await user.save();
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

                this._ws.connectionHandler.emitNewUser(this._userService.toResponseObject(newUser));
                await newUser.save();
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

        if ((await this.validateUser(user)) === "redirect") return res.redirect(environment.TTS_DISCORD_SERVER_INVITE);

        this._ws.connectionHandler.emitUserLogin(await this._userService.get(user.id));
        res.redirect(
            `${environment.CLIENT_BASE_URL}/save?accessToken=${this._signAccessToken(
                user.id
            )}&refreshToken=${this._signRefreshToken(user.id)}`
        );
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
                if (raw.userId === TTS_BOT.ID || raw.userId === TTS_BOT.TEST_ID) return res({ user: null, raw });
                return res({ user: fetchUser ? await this._userService.get(raw.userId) : null, raw });
            } catch (err) {
                return rej(err);
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

                if (a?.type === "access" && r?.type === "refresh" && a?.userId === r?.userId)
                    return res({
                        type: "success",
                        userId: a.userId,
                    });

                return rej("failed");
            } catch (err) {
                if (r?.type === "refresh" && err.name === "TokenExpiredError")
                    return res({
                        type: "refresh",
                        userId: r.userId,
                        tokens: {
                            accessToken: this._signAccessToken(r.userId),
                            refreshToken,
                        },
                    });
                return rej("failed");
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

    public async fetchGuild(tts: Guild): Promise<Guild> {
        const r = await this._http
            .get(`https://discord.com/api/v8/guilds/${environment.TTS_DISCORD_SERVER_ID}`, {
                headers: {
                    Authorization: `Bot ${process.env.BOT_TOKEN}`,
                },
            })
            .toPromise();

        for (const role of r.data.roles) {
            role.color = `#${role.color.toString(16).padStart(6, "0")}`;
        }

        tts.id = r.data.id;
        tts.name = r.data.name;
        tts.iconUrl = getIconUrl(tts.id, r.data.icon);
        tts.roles = r.data.roles;

        await tts.updateOne(tts);
        await tts.save();
        return tts;
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

        if (type === "tokens") res.send(d);
        else
            return res.redirect(
                `${environment.CLIENT_BASE_URL}/save?accessToken=${d.accessToken}&refreshToken=${d.refreshToken}`
            );
    }

    // public async login(res: Response): Promise<void> {
    //     // res.redirect(environment.OAUTH_URL);
    // }
}
