
import { useContext, useEffect } from "react";
import { useHasTokens } from "../modules/auth/useHasTokens";
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
        <p>
            {hasTokens ? <h3> You are not logged in</h3> : null}
            {conn?.user ? <>
                {JSON.stringify(conn?.user, null, 4)}
                <img src={conn?.user?.avatarUrl} /></> : null}

        </p>
        // </WaitForWsAndAuth>
    )
}

export default DashboardPage;
