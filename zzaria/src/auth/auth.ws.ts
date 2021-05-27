import { HttpStatus } from "@nestjs/common";
import { OpCodes } from "@tts/axeroni";
import { Socket } from "socket.io";
import { TTS_BOT } from "../environment/environment";
import { UserService } from "../user/user.service";
import { connections } from "../ws/ConnectionHandler";
import { AuthService } from "./auth.service";

interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export class AuthWebSocket {
    constructor(private socket: Socket, private _authService: AuthService, private _userService: UserService) {
        socket.on(OpCodes.auth, (d) => this.login(d));
    }

    private login({ accessToken, refreshToken }: Tokens) {
        this._authService
            .me(accessToken, refreshToken)
            .then(({ user, raw }) => {
                if (user === null) {
                    this.socket.join(TTS_BOT.ROOM);
                    connections.set(this.socket.id, { userId: TTS_BOT.ID, isTTSBot: true });
                } else
                    connections.set(this.socket.id, {
                        userId: user.id,
                        getUser: () => this._userService.get(user.id),
                        isTTSBot: false,
                    });
                this.socket.emit(OpCodes["auth:success"], user);

                const i = setInterval(() => {
                    this._authService
                        .me(accessToken, refreshToken, false)
                        .then(({ raw }) => {
                            if (raw.type === "refresh") {
                                this.socket.emit(OpCodes["auth:new_tokens"], raw.tokens);
                                accessToken = raw.tokens.accessToken;
                                refreshToken = raw.tokens.refreshToken;
                            }
                        })
                        .catch(() => {
                            this.socket.emit(OpCodes["auth:error"], {
                                error: {
                                    message: "Invalid tokens",
                                    code: HttpStatus.BAD_REQUEST,
                                },
                            });
                            clearInterval(i);
                            connections.delete(this.socket.id);
                        });
                }, 290000);

                this.socket.on("disconnect", () => clearInterval(i));

                if (raw.type === "refresh") {
                    this.socket.emit(OpCodes["auth:new_tokens"], raw.tokens);
                    accessToken = raw.tokens.accessToken;
                    refreshToken = raw.tokens.refreshToken;
                }
            })
            .catch(() => {
                this.socket.emit(OpCodes["auth:error"], {
                    error: {
                        message: "Invalid tokens",
                        code: HttpStatus.BAD_REQUEST,
                    },
                });
                connections.delete(this.socket.id);
            });
    }
}
