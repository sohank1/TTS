import { useState } from "react";
import { isServer } from "../lib/isServer";
import { WaitForWsAndAuth } from "../modules/auth/WaitForWsAndAuth";
import { useTypeSafeQuery } from "../shared-hooks/useTypeSafeQuery";

const Bugs = () => {
    const [id, setId] = useState("");

    const { data, error, isLoading } = useTypeSafeQuery(
        ["getUser", id],
        {
            enabled: !!id && !isServer,
            refetchOnMount: "always",
        },
        [id]
    );

    const {
        data: users,
        isLoading: usersAreLoading,
        refetch,
        isFetching,
    } = useTypeSafeQuery("getUsers", {
        enabled: false,
        refetchOnMount: "always",
    });

    return (
        <>
            <input type="text" onChange={(e) => setId(e.target.value)} />
            <h2>Id: {id}</h2>
            {data && <p>{JSON.stringify(data, null, 4)}</p>}
            {error && <p>{JSON.stringify(error, null, 4)}</p>}
            {isLoading && <p>Loading: {isLoading}</p>}

            <button onClick={() => refetch()}>Get Users</button>
            {isFetching && <h2>FETCHING.....</h2>}
            {users && <p>{JSON.stringify(users, null, 4)}</p>}
            {usersAreLoading && <p>Loading: {usersAreLoading}</p>}
        </>
    );
};

export default function BugsPage() {
    return (
        <WaitForWsAndAuth>
            <Bugs />
        </WaitForWsAndAuth>
    );
}
