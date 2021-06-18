import { HomePage } from "../modules/home/HomePage";
import { WaitForWsAndAuth } from "../modules/auth/WaitForWsAndAuth";
import { useConn } from "../shared-hooks/useConn";
import { MetaController } from "../modules/display/MetaController";

export default function Home() {
    const conn = useConn();

    return (
        <>
            <MetaController />
            <WaitForWsAndAuth>
                {conn?.user ? <>{JSON.stringify(conn?.user, null, 4)}</> : null}
                <HomePage />
            </WaitForWsAndAuth>
        </>
    );
}
