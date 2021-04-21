import { useRouter } from "next/router"
import React, { useEffect, useState } from "react";
import { loginRedirectPathKey } from "../../lib/constants";
import { useTokenStore } from "./useTokenStore";

export const SaveTokens: React.FC = ({ children }) => {
    const { query, replace } = useRouter();
    const { accessToken, refreshToken } = query;
    const [show, setShow] = useState(false)


    useEffect(() => {
        if (typeof accessToken === "string" &&
            typeof refreshToken === "string" &&
            accessToken &&
            refreshToken
        ) {
            try {
                useTokenStore.getState().setTokens({
                    accessToken,
                    refreshToken,
                });
            } catch { }

            const loginRedirectPath = localStorage.getItem(loginRedirectPathKey);
            console.log(loginRedirectPath)

            if (loginRedirectPath?.startsWith("/")) {
                replace(loginRedirectPath);
                setShow(true);
            }
        }
    }), [accessToken, refreshToken]

    if (!show) return <div></div>;
    return <>{children}</>
}