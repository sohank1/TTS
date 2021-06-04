import { commands } from "../../commands/baseCommand/BaseCommand";
import { client } from "../../client/Client";
import { BaseEvent } from "../baseEvent/BaseEvent";
import { Activator } from "../../commands/baseCommand/BaseCommandOptions";
import { Message } from "discord.js";

export default class HandleCommand extends BaseEvent {
    constructor() {
        super("message");
    }

    public init(message: Message): void {
        for (const c of commands)
            for (const a of c.options.aliases) {
                if (
                    c.options.activator === Activator.EQUAL_TO &&
                    message.content.toLowerCase() === client.prefix + a.toLowerCase()
                ) {
                    c.setMessage(message);
                    c.run();
                } else if (
                    c.options.activator === Activator.STARTS_WITH &&
                    message.content.toLowerCase().startsWith(client.prefix + a.toLowerCase())
                ) {
                    c.setMessage(message);
                    c.run();
                }
            }
    }
}
