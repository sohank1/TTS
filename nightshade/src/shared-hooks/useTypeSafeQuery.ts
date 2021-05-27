import { useQuery, UseQueryOptions } from "react-query";
import { isServer } from "../lib/isServer";
import { Query } from "@tts/crustina";
import { useConn } from "./useConn";

type Await<T> = T extends Promise<infer U> ? U : T;

type QueryKeys = keyof Query;
type PaginatedQueryKeys<K extends QueryKeys> = [K, ...(string | number | boolean)[]];

export const useTypeSafeQuery = <K extends QueryKeys>(
    key: K | PaginatedQueryKeys<K>,
    options?: UseQueryOptions,
    params?: Parameters<Query[K]>
) => {
    const conn = useConn();

    return useQuery<Await<ReturnType<Query[K]>>>(
        key,
        //@ts-ignore
        () => conn.query[typeof key === "string" ? key : key[0]](...(params || [])),
        {
            enabled: !!conn && !isServer,
            ...options,
        } as any
    );
};
