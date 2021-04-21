import { useRouter } from "next/router";
import React, { createContext, useEffect, useMemo, useRef, useState } from "react";
import { BASE_URL } from "../../lib/constants";
import { useHasTokens } from "../auth/useHasTokens";
import { useTokenStore } from "../auth/useTokenStore";
import { connect, Connection, User } from "./client";

type V = Connection | null;

export const WebSocketContext = createContext<{
    conn: V;
    setUser: (u: User) => void;
    setConn: (c: V) => void
}>({
    conn: null,
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
    console.log("ws providor")
    const { replace } = useRouter();
    const [conn, setConn] = useState<V>(null);
    const isConnecting = useRef(false);
    const hasTokens = useHasTokens();

    useEffect(() => {
        if (!conn && shouldConnect && !isConnecting.current) {
            isConnecting.current = true;
            console.log("connecting to websocket", isConnecting.current)
            connect("", "", {
                url: BASE_URL,
                getAuthOptions: () => {

                    const { accessToken, refreshToken } = useTokenStore.getState();
                    console.log("getting auth options", accessToken, refreshToken);
                    return { accessToken, refreshToken };
                },
                onClearTokens: () => {
                    replace("/logout");
                    // setConn(null);
                },
                onUser: (user) => {
                    console.log("user", user)
                    setConn({ ...conn, user })
                    isConnecting.current = false;
                }
            })
                .then(c => setConn(c))
                .catch((err) => {
                    console.log(err)
                    if (err.code === 400) {
                        // go to logout page if bad request
                        // replace("/logout")
                        // setConn(null);
                    }
                })
                .finally(() => isConnecting.current = false)
        }
    }, [conn, shouldConnect, replace])

    useEffect(() => {
        if (!conn) return;
        // logic to handle new tokens
    }, [conn])

    return (
        <WebSocketContext.Provider
            value={useMemo(() => ({
                conn,
                setConn,
                setUser: (u: User) => {
                    if (conn) {
                        setConn({
                            ...conn,
                            user: u
                        })
                    }
                }
            }), [conn])}>
            { children}
        </WebSocketContext.Provider>
    )
}