import { useRouter } from "next/router";
import React, { createContext, useEffect, useMemo, useRef, useState } from "react";
import { BASE_URL } from "../../lib/constants";
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
    // check if has tokens
    const [conn, setConn] = useState<V>(null);
    const isConnecting = useRef(false);

    useEffect(() => {
        if (!conn && shouldConnect && !isConnecting.current) {
            isConnecting.current = true;
            connect("", "", {
                url: BASE_URL,
                getAuthOptions: () => {
                    // get token logic
                    return {
                        accessToken: "asdf",
                        refreshToken: "asdf"
                    }
                },
                onClearTokens: () => {
                    setConn(null);
                    // clear token logic
                }
            })
                .then(c => setConn(c))
                .catch((err) => {
                    console.log(err)
                    // if (err.code === 400) 
                    // save next url if bad request
                })
                .finally(() => isConnecting.current = false)
        }
    }, [conn, shouldConnect])

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