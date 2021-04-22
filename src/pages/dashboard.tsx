
import { useContext, useEffect } from "react";
import { WaitForWsAndAuth } from "../modules/auth/WaitForWsAndAuth";
import { WebSocketContext } from "../modules/ws/WebSocketProvider";
import { useConn } from "../shared-hooks/useConn";

const DashboardPage = () => {
    // const { setConn } = useContext(WebSocketContext);
    const conn = useConn();
    useEffect(() => {
        // setConn(null);
        console.log("conn", conn);
    }, [conn])

    return (
        <WaitForWsAndAuth>
            <p>
                {JSON.stringify(conn?.user, null, 4)}
            </p>
        </WaitForWsAndAuth>
    )
}

export default DashboardPage;
