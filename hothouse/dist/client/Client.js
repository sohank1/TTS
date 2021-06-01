"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.Client = void 0;
const discord_js_1 = require("discord.js");
class Client extends discord_js_1.Client {
    constructor(options) {
        super(options);
        this.version = "beta v2.0";
        this.prefix = "t%";
        this._init();
    }
    _init() {
        this.login(process.env.BOT_TOKEN);
        this.on("ready", () => console.log(`${this.user.tag} logged in`));
    }
}
exports.Client = Client;
exports.client = new Client();
//# sourceMappingURL=Client.js.map