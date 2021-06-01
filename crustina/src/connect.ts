import * as io from "socket.io-client";
import { OpCodes, UserResponseObject } from "axeroni";
import { Connection } from "./Connection";
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
        onUser = () => {},
        onNewTokens = () => {},
    }: {
        onConnectionFailed?: () => void;
        onClearTokens?: () => void;
        url?: string;
        getAuthOptions?: () => Partial<{
            accessToken: Token;
            refreshToken: Token;
        }>;
        onUser?: (u: UserResponseObject) => void;
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
                console.log("emitting auth: ", data);
                socket.emit(OpCodes["auth"], data);
            }
        });

        socket.on(OpCodes["auth:error"], ({ error }: { error: Error }) => {
            if (error.code === 400) {
                console.log(error);
                onClearTokens();
            }
        });

        socket.on(OpCodes["auth:new_tokens"], ({ accessToken, refreshToken }) =>
            onNewTokens({ accessToken, refreshToken })
        );

        socket.on("connect", () => {
            socket.on(OpCodes["auth:success"], (u: UserResponseObject) => onUser(u));

            res(new Connection(socket));
        });

        let didEmitConnFailed = false;
        socket.on("connect_error", (e) => {
            console.log("connect error", e);
            res(new Connection(socket));
            if (didEmitConnFailed) return;
            onConnectionFailed();
            didEmitConnFailed = true;
        });
    });
