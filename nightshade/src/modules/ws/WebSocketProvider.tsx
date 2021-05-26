import { useRouter } from "next/router";
import React, { createContext, useEffect, useMemo, useRef, useState } from "react";
import { connect, Connection, User } from "@tts/crustina";
import { BASE_URL } from "../../lib/constants";
import { useSaveTokens } from "../auth/useSaveTokens";
import { useTokenStore } from "../auth/useTokenStore";

type V = Connection | null;

interface Test {
    t: string
}

export const WebSocketContext = createContext<{
    conn: V;
    isServerDown: boolean;
    setUser: (u: User) => void;
    setConn: (c: V) => void;
}>({
    conn: null,
    isServerDown: null,
    // prettier-ignore
    // eslint-disable-next-line prettier/prettier
    setUser: () => { },
    // prettier-ignore
    // eslint-disable-next-line prettier/prettier
    setConn: () => { },
});

interface WebSocketProviderProps {
    shouldConnect: boolean;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ shouldConnect, children }) => {
    console.log("ws providor");
    useSaveTokens();
    const { replace, query, route } = useRouter();
    const [conn, setConn] = useState<V>(null);
    const [isServerDown, setIsServerDown] = useState<boolean>(undefined);
    const isConnecting = useRef(false);

    useEffect(() => {
        if (query.accessToken && query.refreshToken) shouldConnect = false;
        console.log("query", query, route);
        console.log("websocket use effect called");
        console.log("shouldConnect", shouldConnect);
        if (!conn && shouldConnect && !isConnecting.current) {
            isConnecting.current = true;
            console.log("connecting to websocket", isConnecting.current);
            let v;
            setTimeout(() => {
                const { accessToken, refreshToken } = useTokenStore.getState();
                console.log("getting auth options", {
                    accessToken: accessToken || query.accessToken,
                    refreshToken: refreshToken || query.refreshToken,
                });

                v = {
                    accessToken: accessToken || query.accessToken,
                    refreshToken: refreshToken || query.refreshToken,
                };

                connect(v.accessToken, v.refreshToken, {
                    url: BASE_URL,
                    // getAuthOptions: () => {

                    // const { accessToken, refreshToken } = useTokenStore.getState();
                    // console.log("getting auth options", { accessToken: accessToken || query.accessToken, refreshToken: refreshToken || query.refreshToken });

                    // return { accessToken: accessToken || query.accessToken, refreshToken: refreshToken || query.refreshToken };

                    // },
                    onClearTokens: () => {
                        replace("/logout");
                        // setConn(null);
                    },
                    onNewTokens: (t) => {
                        useTokenStore.getState().setTokens(t);
                    },
                    onUser: (user) => {
                        console.log("user", user);

                        setConn((c) => ({
                            close: c.close,
                            fetch: c.fetch,
                            socket: c.socket,
                            user,
                        }));

                        isConnecting.current = false;
                    },
                    onConnectionFailed: () => {
                        setConn((c) => ({
                            close: c.close,
                            fetch: c.fetch,
                            socket: c.socket,
                            user: null,
                        }));
                        setIsServerDown(true);
                    },
                })
                    .then((c) => {
                        // if (hasTokens) {
                        // setConn(null);
                        // isConnecting.current = true
                        // }
                        // else {

                        setConn(c);
                        isConnecting.current = false;
                        setIsServerDown(false);

                        // c.socket.on("disconnect", () => {
                        //     setConn(null);
                        // });

                        // }
                    })
                    .catch((err) => {
                        console.log(err);
                        if (err.code === 400) {
                            // go to logout page if bad request
                            // replace("/logout")
                            // setConn(null);
                        }
                    })
                    .finally(() => {
                        // isConnecting.current = false;
                    });
            }, 90);
        }
    }, [replace]);

    return (
        <WebSocketContext.Provider
            value={useMemo(
                () => ({
                    conn,
                    isServerDown,
                    setConn,
                    setUser: (user: User) => {
                        if (conn) {
                            setConn((c) => ({
                                close: c.close,
                                fetch: c.fetch,
                                socket: c.socket,
                                user,
                            }));
                        }
                    },
                }),
                [conn]
            )}
        >
            {children}
        </WebSocketContext.Provider>
    );
};
