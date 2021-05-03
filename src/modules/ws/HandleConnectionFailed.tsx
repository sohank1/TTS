import React, { useContext, useEffect } from "react";;
import { useRouter } from "next/router"
import { navLinks } from "../../ui/NavBar/NavLinks";
import { WebSocketContext } from "./WebSocketProvider";;

export const HandleConnectionFailed: React.FC = ({ children }) => {
    const { isServerDown, conn } = useContext(WebSocketContext)
    const { route, replace } = useRouter();

    try {
        if (isServerDown && navLinks.some(l => route.toLowerCase().includes(l.path)))
            replace("/");
    }
    catch { }


    useEffect(() => console.log(isServerDown, "down?", conn), [isServerDown, conn])

    if (isServerDown === null) return null;

    if (isServerDown) return (
        <>
            <h2>down</h2>
            {children}
        </>
    )

    return <>{children}</>


}