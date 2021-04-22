import React from "react";
import { useConn } from "../../shared-hooks/useConn";

export const WaitForWsAndAuth: React.FC = ({ children }) => {
    const conn = useConn();

    if (!conn?.user) return null;

    return <>{children}</>;
}