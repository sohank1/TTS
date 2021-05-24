import { TextChannel } from "discord.js";
import * as io from "socket.io-client";
import { client } from "../client/Client";
import { Environment } from "../environment/Environment";
// import { Events } from "./Events";

export class WebSocket {
    public socket = io(Environment.BASE_URL);

    constructor() {
        const c = <TextChannel>client.channels.cache.find((c: TextChannel) => c.name.includes("mod-logs"));
        this.socket.emit("auth", { refreshToken: process.env.REFRESH_TOKEN, accessToken: process.env.ACCESS_TOKEN });
        // console.log(this.socket)
        // this.socket.on(Events.LOGIN, (data) => {
        //     console.log(this.socket);
        //     console.log(data);
        // });
        this.socket.on("message", (d) => console.log(d));
        this.socket.on("connect", () => console.log("connected"));
        this.socket.on("auth-success", (d) => console.log(d));
        this.socket.on("auth-error", (d) => console.log(d));

        this.socket.on("login", (d) => c.send("login " + d.name));
        this.socket.on("logout", (d) => c.send("logout " + d.name));
        this.socket.on("new-user", (d) => c.send("new-user " + d.name));
        this.socket.on("user-update", (d) => c.send("user-update " + d.name));
    }
}
