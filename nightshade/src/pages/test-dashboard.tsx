import { useHasTokens } from "../modules/auth/useHasTokens";
import { useConn } from "../shared-hooks/useConn";

const DashboardPage = () => {
    const conn = useConn();
    const hasTokens = useHasTokens();

    return (
        <>
            {conn?.user ? (
                <>
                    <p>{JSON.stringify(conn?.user, null, 4)}</p>
                    <img src={conn?.user?.avatarUrl} />
                </>
            ) : (
                !hasTokens && <h3>You are not logged in</h3>
            )}
        </>
    );
};

export default DashboardPage;
