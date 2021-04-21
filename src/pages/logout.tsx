import { useEffect } from "react";
import { useRouter } from "next/router";
import { useTokenStore } from "../modules/auth/useTokenStore";

const LogoutPage = () => {
    const { replace } = useRouter();
    const setTokens = useTokenStore(s => s.setTokens);

    useEffect(() => {
        setTokens({ accessToken: "", refreshToken: "" });
        replace("/");
    }, [replace, setTokens])

    return null;

}


export default LogoutPage;