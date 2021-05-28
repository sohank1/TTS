import { ContentResponseObject, UserResponseObject } from "axeroni";
import { Connection } from "./Connection";

export class Query {
    constructor(private fetch: Connection["fetch"]) {}

    public getUsers(): Promise<UserResponseObject[]> {
        return this.fetch("user:get_all");
    }

    public getUser(id: string): Promise<UserResponseObject> {
        return this.fetch("user:get", id);
    }

    public getContent(): Promise<ContentResponseObject> {
        return this.fetch("content:get");
    }
}
