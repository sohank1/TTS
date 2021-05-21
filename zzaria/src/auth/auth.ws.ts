import { HttpStatus } from "@nestjs/common";
import { Socket } from "socket.io";
import { OpCodes } from "../ws/OpCodes";
import { AuthService } from "./auth.service";

interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export class AuthWebSocket {
    constructor(private socket: Socket, private _authService: AuthService) {
        socket.on(OpCodes.AUTH, (d) => this.login(d));
    }

    private login({ accessToken, refreshToken }: Tokens) {
        this._authService
            .me(accessToken, refreshToken)
            .then(({ user, raw }) => {
                if (user) {
                    this.socket.emit(OpCodes.AUTH_SUCCESS, user);

                    const i = setInterval(() => {
                        this._authService
                            .me(accessToken, refreshToken, false)
                            .then(({ raw }) => {
                                if (raw.type === "refresh") {
                                    this.socket.emit(OpCodes.NEW_TOKENS, raw.tokens);
                                    accessToken = raw.tokens.accessToken;
                                    refreshToken = raw.tokens.refreshToken;
                                }
                            })
                            .catch(() => {
                                this.socket.emit(OpCodes.AUTH_ERROR, {
                                    error: {
                                        message: "Invalid tokens",
                                        code: HttpStatus.BAD_REQUEST,
                                    },
                                });
                                clearInterval(i);
                            });
                    }, 290000);

                    this.socket.on("disconnect", () => clearInterval(i));
                }
                if (raw.type === "refresh") {
                    this.socket.emit(OpCodes.NEW_TOKENS, raw.tokens);
                    accessToken = raw.tokens.accessToken;
                    refreshToken = raw.tokens.refreshToken;
                }
            })
            .catch(() => {
                this.socket.emit(OpCodes.AUTH_ERROR, {
                    error: {
                        message: "Invalid tokens",
                        code: HttpStatus.BAD_REQUEST,
                    },
                });
            });
    }
}
