import { useRouter } from "next/router"
import { useEffect } from "react";
import { loginRedirectPathKey } from "../../lib/constants";
import { useTokenStore } from "./useTokenStore";

export const useSaveTokens = () => {
    const { query, replace } = useRouter();
    const { accessToken, refreshToken } = query;


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

            if (loginRedirectPath?.startsWith("/"))
                replace(loginRedirectPath);

        }
    }), [accessToken, refreshToken]

}