
import { useContext, useEffect } from "react";
import { WebSocketContext } from "../modules/ws/WebSocketProvider";
import { useConn } from "../shared-hooks/useConn";

const DashboardPage = () => {
    const { setConn } = useContext(WebSocketContext);
    // const conn = useConn();
    useEffect(() => {
        // setConn(null);
        // console.log(conn)
    }, [])

    return (
        <p>
            asdf
            {/* {JSON.stringify(conn.user, null, 4)} */}
        </p>
    )
}

export default DashboardPage;
