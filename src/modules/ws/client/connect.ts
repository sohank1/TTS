import io from "socket.io-client";
import { User } from "./entities";
import { Connection, Token, Error } from "./types";

const apiUrl = "https://tts-api-prod.herokuapp.com";

export const connect = (
    token: Token,
    refreshToken: Token,
    {
        onConnectionTaken = () => { },
        onClearTokens = () => { },
        url = apiUrl,
        getAuthOptions
    }: {
        onConnectionTaken?: () => void;
        onClearTokens?: () => void;
        url?: string;
        getAuthOptions?: () => Partial<{
            token: Token;
            refreshToken: Token
        }>

    }
): Promise<Connection> =>
    new Promise((res, rej) => {
        const socket = io(url);

        socket.on("connect", () => {
            socket.emit("auth", {
                accessToken: token,
                refreshToken,
                ...getAuthOptions?.()
            })
        })

        socket.on("auth-error", ({ error }: { error: Error }) => {
            if (error.code === 400) {
                socket.close();
                onClearTokens();
            }

            rej(error);
        })

        socket.on("auth-success", (user: User) => {
            const conn: Connection = {
                socket,
                user,
                close: () => socket.close(),
                fetch: (event: string, data: unknown, serverEvent: string): Promise<any> =>
                    new Promise((resFetch, rejFetch) => {
                        socket.emit(event, data);

                        socket.on(serverEvent, (d: { error?: Error }) => {
                            if (d.error) rejFetch(d.error);
                            resFetch(d);
                        })
                    })
            }

            res(conn);
        })
    })