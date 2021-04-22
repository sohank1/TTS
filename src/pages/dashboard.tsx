
import { useContext, useEffect } from "react";
import { useHasTokens } from "../modules/auth/useHasTokens";
import { useTokenStore } from "../modules/auth/useTokenStore";
import { WaitForWsAndAuth } from "../modules/auth/WaitForWsAndAuth";
import { WebSocketContext } from "../modules/ws/WebSocketProvider";
import { useConn } from "../shared-hooks/useConn";


const DashboardPage = () => {
    // const { setConn } = useContext(WebSocketContext);
    const conn = useConn();
    const hasTokens = useHasTokens();
    useEffect(() => {
        // setConn(null);
        console.log("conn", conn);
    }, [conn])

    return (
        // <WaitForWsAndAuth>
        <>

            {conn?.user ? <>
                <p>{JSON.stringify(conn?.user, null, 4)}</p>
                <img src={conn?.user?.avatarUrl} /></> :
                !hasTokens && <h3>You are not logged in</h3>}
        </>
        // </WaitForWsAndAuth>
    )
}

export default DashboardPage;
