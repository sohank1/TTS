import * as io from "socket.io-client";
import { Connection } from "./Connection";
import { User } from "./entities";
import { Token, Error } from "./types";

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
            socket.on("auth-success", (u: User) => onUser(u));

            res(new Connection(socket, null));
        });

        socket.on("connect_error", (e) => {
            console.log("connect error", e);
            res(new Connection(socket, null));
            onConnectionFailed();
        });
    });
