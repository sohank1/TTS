import React from "react";
import { useConn } from "../../shared-hooks/useConn";

export const WaitForConn: React.FC = ({ children }) => {
    const conn = useConn();

    // If conn is null return null
    if (!conn) return null;

    // As soon as conn as a value the children will be returned
    return <>{children}</>;
}