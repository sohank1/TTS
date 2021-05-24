import { useEffect } from "react";
import { useRouter } from "next/router";
import { loginRedirectPathKey } from "../../lib/constants";
import { useTokenStore } from "./useTokenStore";

export const useSaveTokens = () => {
    const { route, query, replace } = useRouter();
    const { accessToken, refreshToken } = query;

    useEffect(() => {
        console.log("routeee", route);
        if (
            route === "/save" &&
            typeof accessToken === "string" &&
            typeof refreshToken === "string" &&
            accessToken &&
            refreshToken
        ) {
            try {
                useTokenStore.getState().setTokens({
                    accessToken,
                    refreshToken,
                });
            } catch {}

            const loginRedirectPath = localStorage.getItem(loginRedirectPathKey);
            console.log(loginRedirectPath);

            if (loginRedirectPath?.startsWith("/")) replace(loginRedirectPath);
            else replace("/dashboard");
        } else if (route === "/save" && !accessToken && !refreshToken) replace("/");
    }),
        [accessToken, refreshToken];
};
