import { isServer } from "../../lib/isServer";
import { useTokenStore } from "./useTokenStore"

export const useHasTokens = () => {
    console.log("isServer", isServer)
    if (isServer) return true;
    return useTokenStore((s) => !!(s.accessToken && s.refreshToken))
};
