import Head from "next/head";
import { useContext, useEffect } from "react";
import { useSaveTokens } from "../modules/auth/useSaveTokens";
import { WaitForWsAndAuth } from "../modules/auth/WaitForWsAndAuth";
import { HomePage } from "../modules/home/HomePage";
import { WebSocketContext } from "../modules/ws/WebSocketProvider";
import { useConn } from "../shared-hooks/useConn";

export default function Home() {
    const conn = useConn();
    // const { setConn } = useContext(WebSocketContext);


    // useEffect(() => {
    //     setConn(null);
    // }, [])


    return (
        <>
            <WaitForWsAndAuth>
                {conn?.user ? <>{JSON.stringify(conn?.user, null, 4)}</> : null}
                <HomePage />
            </WaitForWsAndAuth>
        </>
    )
}
