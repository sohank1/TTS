"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Embed = void 0;
const discord_js_1 = require("discord.js");
const Client_1 = require("../Client");
class Embed extends discord_js_1.MessageEmbed {
    constructor(data) {
        super(data);
        this._init();
    }
    sendTo(...args) {
        for (const c of args)
            c.send(this);
        return this;
    }
    _init() {
        this.setColor("#b81616").setTimestamp().setFooter(Client_1.client.version);
    }
}
exports.Embed = Embed;
Embed.color = "#b81616";
//# sourceMappingURL=Embed.js.map