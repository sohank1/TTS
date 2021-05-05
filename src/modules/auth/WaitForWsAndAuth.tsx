import React, { useEffect } from "react";
import { useConn } from "../../shared-hooks/useConn";
import { useHasTokens } from "./useHasTokens";

export const WaitForWsAndAuth: React.FC = ({ children }) => {
    const conn = useConn();
    const hasTokens = useHasTokens();

    // If there is no websocket connection return nothing
    if (!conn) return null;

    // If user is not logged in just show the page
    if (!hasTokens) return <>{children}</>;

    // If user is logged in but user not loaded yet return nothing
    if (!conn?.user) return null;

    // Once user is loaded show the page
    return <>{children}</>;
}
