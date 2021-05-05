import { useRouter } from "next/router";
import React, { createContext, useEffect, useMemo, useRef, useState } from "react";
import { BASE_URL } from "../../lib/constants";
import { useHasTokens } from "../auth/useHasTokens";
import { useSaveTokens } from "../auth/useSaveTokens";
import { useTokenStore } from "../auth/useTokenStore";
import { connect, Connection, User } from "./client";

type V = Connection | null;

export const WebSocketContext = createContext<{
    conn: V;
    isServerDown: boolean;
    setUser: (u: User) => void;
    setConn: (c: V) => void
}>({
    conn: null,
    isServerDown: null,
    setUser: () => { },
    setConn: () => { },
})

interface WebSocketProviderProps {
    shouldConnect: boolean;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
    shouldConnect,
    children,
}) => {
    console.log("ws providor");
    useSaveTokens();
    const { replace, query, route } = useRouter();
    const [conn, setConn] = useState<V>(null);
    const [isServerDown, setIsServerDown] = useState<boolean>(undefined);
    const isConnecting = useRef(false);
    const hasTokens = useHasTokens();


    useEffect(() => {
        if (query.accessToken && query.refreshToken) shouldConnect = false;
        console.log("query", query, route)
        console.log("websocket use effect called")
        console.log("shouldConnect", shouldConnect)
        if (!conn && shouldConnect && !isConnecting.current) {
            isConnecting.current = true;
            console.log("connecting to websocket", isConnecting.current)
            let v;
            setTimeout(() => {
                const { accessToken, refreshToken } = useTokenStore.getState();
                console.log("getting auth options", { accessToken: accessToken || query.accessToken, refreshToken: refreshToken || query.refreshToken });

                v = { accessToken: accessToken || query.accessToken, refreshToken: refreshToken || query.refreshToken };


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
                    onUser: (user) => {
                        console.log("user", user);
                        setConn(c => ({ ...c, user }));
                        isConnecting.current = false;
                    },
                    onConnectionFailed: () => {
                        setIsServerDown(true);
                    }
                })
                    .then(c => {
                        // if (hasTokens) {
                        // setConn(null);
                        // isConnecting.current = true
                        // }
                        // else {

                        setConn(c);
                        isConnecting.current = false;
                        setIsServerDown(false);

                        // }
                    })
                    .catch((err) => {
                        console.log(err)
                        if (err.code === 400) {
                            // go to logout page if bad request
                            // replace("/logout")
                            // setConn(null);
                        }
                    })
                    .finally(() => {
                        // isConnecting.current = false;                    
                    })
            }, 90)
        }

    }, [replace])

    useEffect(() => {
        if (!conn) return;
        // logic to handle new tokens
    }, [conn])

    return (
        <WebSocketContext.Provider
            value={useMemo(() => ({
                conn,
                isServerDown,
                setConn,
                setUser: (user: User) => {
                    if (conn) {
                        setConn({
                            ...conn,
                            user,
                        })
                    }
                }
            }), [conn])}>
            {children}
        </WebSocketContext.Provider>
    )
}
