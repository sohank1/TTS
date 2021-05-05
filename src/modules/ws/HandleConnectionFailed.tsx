import React, { useContext } from "react";;
import { useRouter } from "next/router"
import { navLinks } from "../../ui/NavBar/NavLinks";
import { WebSocketContext } from "./WebSocketProvider";
import { useTokenStore } from "../auth/useTokenStore";
import { ServerDownModal } from "../../ui/ServerDownModal";


export const HandleConnectionFailed: React.FC = ({ children }) => {
    const { isServerDown } = useContext(WebSocketContext)
    const { route, replace } = useRouter();
    const setTokens = useTokenStore(s => s.setTokens);

    try {
        if (isServerDown && navLinks.some(l => route.toLowerCase().includes(l.path)))
            replace("/");
    }
    catch { }

    if (isServerDown) {
        setTokens({ accessToken: "", refreshToken: "" });

        return (
            <>
                <ServerDownModal />
                {children}
            </>
        )
    }

    return <>{children}</>


}