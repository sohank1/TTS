import * as io from "socket.io-client";
import { User } from "./entities";
import { Connection, Token, Error } from "./types";

const apiUrl = "https://tts-api-prod.herokuapp.com";

export const connect = (
    token: Token,
    refreshToken: Token,
    {
        onConnectionFailed = () => {},
        onClearTokens = () => {},
        url = apiUrl,
        getAuthOptions,
        onUser,
        onNewTokens,
    }: {
        onConnectionFailed?: () => void;
        onClearTokens?: () => void;
        url?: string;
        getAuthOptions?: () => Partial<{
            accessToken: Token;
            refreshToken: Token;
        }>;
        onUser?: (u: User) => void;
        onNewTokens?: (tokens: { accessToken: string; refreshToken: string }) => void;
    }
): Promise<Connection> =>
    new Promise((res) => {
        const socket = io(url, {
            transports: ["websocket"],
            upgrade: false,
        });

        socket.on("connect", () => {
            const data = {
                accessToken: token,
                refreshToken,
                ...getAuthOptions?.(),
            };
            console.log(data);
            if (data.accessToken && data.refreshToken) {
                console.log("emitting auth");
                socket.emit("auth", data);
            }
        });

        socket.on("auth-error", ({ error }: { error: Error }) => {
            if (error.code === 400) {
                console.log(error);
                onClearTokens();
            }
        });

        socket.on("new-tokens", onNewTokens);

        socket.on("connect", () => {
            const conn: Connection = {
                socket,
                user: null,
                close: () => socket.close(),
                fetch: (event: string, payload?: unknown, serverEvent?: string): Promise<any> =>
                    new Promise((resFetch, rejFetch) => {
                        if (payload) socket.emit(event, payload);
                        else socket.emit(event);

                        socket.on(serverEvent || `fetch-done:${event}`, (d: { error?: Error }) => {
                            if (d.error) rejFetch(d.error);
                            resFetch(d);
                        });
                    }),
            };

            socket.on("auth-success", (u: User) => onUser(u));

            res(conn);
        });

        socket.on("connect_error", (e) => {
            console.log("connect error", e);
            const conn: Connection = {
                socket,
                user: null,
                close: () => socket.close(),
                fetch: (event: string, payload?: unknown, serverEvent?: string): Promise<any> =>
                    new Promise((resFetch, rejFetch) => {
                        socket.emit(event, payload);

                        socket.on(serverEvent || `fetch-done:${event}`, (d: { error?: Error }) => {
                            if (d.error) rejFetch(d.error);
                            resFetch(d);
                        });
                    }),
            };
            res(conn);
            onConnectionFailed();
        });
    });
