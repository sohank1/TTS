import { Connection } from "./Connection";
import { Guild, User } from "./entities";

export class Query {
    constructor(private fetch: Connection["fetch"]) {}

    public getUsers(): Promise<User[]> {
        return this.fetch("get-users");
    }

    public getUser(id: string): Promise<User> {
        return this.fetch("get-user", id);
    }

    public getContent(): Promise<Guild> {
        return this.fetch("get-content");
    }
}
