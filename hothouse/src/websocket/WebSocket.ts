import { connect, Connection } from "crustina";
import { TextChannel } from "discord.js";
import { client } from "../client/Client";
import { Environment } from "../environment/Environment";

export class WebSocket {
    public conn: Connection;

    constructor() {
        this._init();
    }

    private async _init() {
        const c = <TextChannel>client.channels.cache.find((c: TextChannel) => c.name.includes("mod-logs"));

        this.conn = await connect(process.env.ACCESS_TOKEN, process.env.REFRESH_TOKEN, {
            url: Environment.BASE_URL,
        });

        this.conn.socket.on("connect", () => console.log("connected"));

        this.conn.on.login((d) => c.send("logout / disconnect " + d.name));
        this.conn.on.logout((d) => c.send("logout " + d.name));
        this.conn.on.newUser((d) => c.send("new-user " + d.name));
        this.conn.on.userUpdate((d) => c.send("user-update " + d.name));
    }
}
