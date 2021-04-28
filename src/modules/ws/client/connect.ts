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
        getAuthOptions,
        onUser
    }: {
        onConnectionTaken?: () => void;
        onClearTokens?: () => void;
        url?: string;
        getAuthOptions?: () => Partial<{
            token: Token;
            refreshToken: Token
        }>
        onUser?: (u: User) => void;

    }
): Promise<Connection> =>
    new Promise((res, rej) => {
        const socket = io(url);

        // socket.on("connect", () => {
        const data = {
            accessToken: token,
            refreshToken,
            ...getAuthOptions?.()
        }
        console.log(data)
        if (data.accessToken && data.refreshToken) {
            console.log("emitting auth")
            socket.emit("auth", data)
        }
        // })

        socket.on("auth-error", ({ error }: { error: Error }) => {
            if (error.code === 400) {
                console.log(error)
                // socket.close();
                onClearTokens();
            }
            // rej(error);
        })



        socket.on("connect", () => {
            const conn: Connection = {
                socket,
                user: null,
                close: () => socket.close(),
                fetch: (event: string, data?: unknown, serverEvent?: string): Promise<any> =>
                    new Promise((resFetch, rejFetch) => {
                        socket.emit(event, data);

                        socket.on(serverEvent || `fetch-done:${event}`, (d: { error?: Error }) => {
                            if (d.error) rejFetch(d.error);
                            resFetch(d);
                        })
                    })
            }

            socket.on("auth-success", (u: User) => onUser(u))

            res(conn);
        })


    })