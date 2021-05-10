import { HomePage } from "../modules/home/HomePage";
import { WaitForWsAndAuth } from "../modules/auth/WaitForWsAndAuth";
import { useConn } from "../shared-hooks/useConn";

export default function Home() {
    const conn = useConn();

    return (
        <>
            <WaitForWsAndAuth>
                {conn?.user ? <>{JSON.stringify(conn?.user, null, 4)}</> : null}
                <HomePage />
            </WaitForWsAndAuth>
        </>
    );
}
