import { Guild, User } from "./entities";
import { Connection } from "./Connection";

export const wrap = (conn: Connection) => ({
    conn,
    query: {
        getUser: (id: string): Promise<User> => conn.fetch("get-user", id),
        getUsers: (): Promise<User[]> => conn.fetch("get-users"),
        getContent: (): Promise<Guild> => conn.fetch("get-content"),
    },
});
