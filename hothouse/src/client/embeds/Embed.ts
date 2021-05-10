import { MessageEmbed, MessageEmbedOptions } from "discord.js";
import { client } from "../Client";

export class Embed extends MessageEmbed {
    public static color = "#b81616";

    constructor(data?: MessageEmbed | MessageEmbedOptions) {
        super(data);
        this._init();
    }

    /**
     * Sends the embed to text channels
     * @param channels - The text channels the embed will be sent to
     */
    public sendTo(...args: any[]): Embed {
        for (const c of args) c.send(this);
        return this;
    }

    private _init(): void {
        this.setColor("#b81616").setTimestamp().setFooter(client.version);
    }
}
