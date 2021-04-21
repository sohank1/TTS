import { useTokenStore } from "./useTokenStore"

export const useHasTokens = () => useTokenStore((s) => !!(s.accessToken && s.refreshToken));
