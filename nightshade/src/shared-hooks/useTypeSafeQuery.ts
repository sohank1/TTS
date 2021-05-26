import { useQuery, UseQueryOptions } from "react-query";
import { isServer } from "../lib/isServer";
import { wrap } from "@tts/crustina";
import { useWrappedConn } from "./useWrappedCon";

type Await<T> = T extends Promise<infer U> ? U : T;

type Query = ReturnType<typeof wrap>["query"];
type QueryKeys = keyof Query;
type PaginatedQueryKeys<K extends QueryKeys> = [K, ...(string | number | boolean)[]];

export const useTypeSafeQuery = <K extends QueryKeys>(
    key: K | PaginatedQueryKeys<K>,
    options?: UseQueryOptions,
    params?: Parameters<Query[K]>
) => {
    const conn = useWrappedConn();

    return useQuery<Await<ReturnType<Query[K]>>>(
        key,
        () => {
            const fn = conn.query[typeof key === "string" ? key : key[0]] as any;
            return fn(...(params || []));
        },
        {
            enabled: !!conn && !isServer,
            ...options,
        } as any
    );
};
