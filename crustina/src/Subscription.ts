import { UserResponseObject } from "axeroni";
import { Connection } from "./Connection";
import { ListenerHandler } from "./types";

export class Subscription {
    constructor(private conn: Connection) {}

    public login(h: ListenerHandler<UserResponseObject>) {
        return this.conn.addListener("auth:login", h);
    }

    public logout(h: ListenerHandler<UserResponseObject>) {
        return this.conn.addListener("auth:logout", h);
    }

    public newUser(h: ListenerHandler<UserResponseObject>) {
        return this.conn.addListener("user:new", h);
    }

    public userUpdate(h: ListenerHandler<UserResponseObject>) {
        return this.conn.addListener("user:update", h);
    }
}
