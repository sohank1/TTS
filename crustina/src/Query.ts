import { ContentResponseObject, UserResponseObject } from "axeroni";
import { Connection } from "./Connection";

export class Query {
    constructor(private conn: Connection) {}

    public getUsers(): Promise<UserResponseObject[]> {
        return this.conn.fetch("user:get_all");
    }

    public getUser(id: string): Promise<UserResponseObject> {
        return this.conn.fetch("user:get", id);
    }

    public getContent(): Promise<ContentResponseObject> {
        return this.conn.fetch("content:get");
    }
}
