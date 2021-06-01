"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocket = void 0;
const crustina_1 = require("crustina");
const Client_1 = require("../client/Client");
const Environment_1 = require("../environment/Environment");
class WebSocket {
    constructor() {
        this._init();
    }
    async _init() {
        const c = Client_1.client.channels.cache.find((c) => c.name.includes("mod-logs"));
        this.conn = await crustina_1.connect(process.env.ACCESS_TOKEN, process.env.REFRESH_TOKEN, {
            url: Environment_1.Environment.BASE_URL,
        });
        this.conn.socket.on("connect", () => console.log("connected"));
        this.conn.on.login((d) => c.send("logout / disconnect " + d.name));
        this.conn.on.logout((d) => c.send("logout " + d.name));
        this.conn.on.newUser((d) => c.send("new-user " + d.name));
        this.conn.on.userUpdate((d) => c.send("user-update " + d.name));
    }
}
exports.WebSocket = WebSocket;
//# sourceMappingURL=WebSocket.js.map