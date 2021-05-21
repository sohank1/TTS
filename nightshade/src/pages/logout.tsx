import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useTokenStore } from "../modules/auth/useTokenStore";
import { WebSocketContext } from "../modules/ws/WebSocketProvider";

const LogoutPage = () => {
    const { replace } = useRouter();
    const setTokens = useTokenStore((s) => s.setTokens);
    const { conn, setConn, setUser } = useContext(WebSocketContext);

    useEffect(() => {
        conn.close();
        setUser(null);
        replace("/");
        setConn(null);
        setTokens({ accessToken: "", refreshToken: "" });
    }, [replace, setTokens]);

    return null;
};

export default LogoutPage;
