import { commands } from "../../commands/baseCommand/BaseCommand";
import { client } from "../../client/Client";
import { BaseEvent } from "../baseEvent/BaseEvent";
import { Activator } from "../../commands/baseCommand/BaseCommandOptions";

export default class HandleCommand extends BaseEvent {
    public init(): void {
        client.on("ready", () => {
            client.user.setStatus("idle");
        });

        client.on("message", (message) => {
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
        });
    }
}
