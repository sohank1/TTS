import { useRouter } from "next/router";
import { loginRedirectPathKey } from "../../lib/constants";
import { navLinks } from "../../ui/NavBar/NavLinks";
import { useHasTokens } from "./useHasTokens"

export const useSaveLoginRedirectPath = () => {
    let { asPath } = useRouter();
    const hasTokens = useHasTokens();

    if (!hasTokens) {
        try {
            if (!navLinks.some(l => asPath.toLowerCase().includes(l.path)) && asPath.toLowerCase() !== "/save") {
                localStorage.setItem(loginRedirectPathKey, "/dashboard");
                asPath = "/dashboard";
            }
            localStorage.setItem(loginRedirectPathKey, asPath);
        } catch { }
    }
}