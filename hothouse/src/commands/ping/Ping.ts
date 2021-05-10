import { client } from "../../client/Client";
import { BaseCommand } from "../baseCommand/BaseCommand";
import { Activator } from "../baseCommand/BaseCommandOptions";

export default class Ping extends BaseCommand {
    constructor() {
        super({
            name: "ping",
            aliases: ["latency"],
            info: "says the ping",
            type: "fun",
            activator: Activator.STARTS_WITH,
        });
    }

    public async run(): Promise<void> {
        this.message.channel.send(client.ws.ping);
    }
}
