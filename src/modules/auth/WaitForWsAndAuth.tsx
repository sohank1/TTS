import React from "react";
import { useConn } from "../../shared-hooks/useConn";

export const WaitForWsAndAuth: React.FC = ({ children }) => {
    const conn = useConn();

    if (!conn) return (
        <div>loading</div>
    )

    return <>{children}</>
}