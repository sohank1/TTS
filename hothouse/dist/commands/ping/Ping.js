"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("../../client/Client");
const BaseCommand_1 = require("../baseCommand/BaseCommand");
const BaseCommandOptions_1 = require("../baseCommand/BaseCommandOptions");
class Ping extends BaseCommand_1.BaseCommand {
    constructor() {
        super({
            name: "ping",
            aliases: ["latency"],
            info: "says the ping",
            type: "fun",
            activator: BaseCommandOptions_1.Activator.STARTS_WITH,
        });
    }
    async run() {
        this.message.channel.send(Client_1.client.ws.ping);
    }
}
exports.default = Ping;
//# sourceMappingURL=Ping.js.map