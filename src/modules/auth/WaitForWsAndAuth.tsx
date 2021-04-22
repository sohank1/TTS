import React from "react";
import { useConn } from "../../shared-hooks/useConn";

export const WaitForWsAndAuth: React.FC = ({ children }) => {
    const conn = useConn();

    if (!conn?.user) return <h2>loading...</h2>;

    return <>{children}</>;
}
