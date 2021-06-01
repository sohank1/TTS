"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseCommand_1 = require("../../commands/baseCommand/BaseCommand");
const Client_1 = require("../../client/Client");
const BaseEvent_1 = require("../baseEvent/BaseEvent");
const BaseCommandOptions_1 = require("../../commands/baseCommand/BaseCommandOptions");
class HandleCommand extends BaseEvent_1.BaseEvent {
    init() {
        Client_1.client.on("ready", () => {
            Client_1.client.user.setStatus("idle");
        });
        Client_1.client.on("message", (message) => {
            for (const c of BaseCommand_1.commands)
                for (const a of c.options.aliases) {
                    if (c.options.activator === BaseCommandOptions_1.Activator.EQUAL_TO &&
                        message.content.toLowerCase() === Client_1.client.prefix + a.toLowerCase()) {
                        c.setMessage(message);
                        c.run();
                    }
                    else if (c.options.activator === BaseCommandOptions_1.Activator.STARTS_WITH &&
                        message.content.toLowerCase().startsWith(Client_1.client.prefix + a.toLowerCase())) {
                        c.setMessage(message);
                        c.run();
                    }
                }
        });
    }
}
exports.default = HandleCommand;
//# sourceMappingURL=HandleCommand.js.map