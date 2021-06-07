/* eslint-disable prettier/prettier */
import { useState } from "react";
import { useConn } from "../../shared-hooks/useConn";
import { LoadingAnimation } from "../../ui/LoadingAnimation";
import { useHasTokens } from "./useHasTokens";

export const WaitForWsAndAuth: React.FC = ({ children }) => {
    const [show, setShow] = useState(false);
    const conn = useConn();
    const hasTokens = useHasTokens();

    // If there is no websocket connection return nothing
    if (!conn) return <LoadingAnimation show={show} />;

    // If user is not logged in just show the page
    if (!hasTokens) {
        // setOpen(false);
        setTimeout(() => {
            setShow(false);
        }, 1600);
        return !show && <>{children}</>;
    }

    // If user is logged in but user not loaded yet return nothing
    if (!conn?.user) return <LoadingAnimation show={show} />;

    // Once user is loaded show the page

    // setOpen(false);
    setTimeout(() => {
        setShow(false);
    }, 1600);
    return !show && <>{children}</>;

    // return <>{children}</>;
};
