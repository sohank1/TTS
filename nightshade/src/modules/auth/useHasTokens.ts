import { isServer } from "../../lib/isServer";
import { useTokenStore } from "./useTokenStore";

export const useHasTokens = () => {
    if (isServer) return true;
    return useTokenStore((s) => !!(s.accessToken && s.refreshToken));
};
