import { MessageEmbed, MessageEmbedOptions } from "discord.js";
export declare class Embed extends MessageEmbed {
    static color: string;
    constructor(data?: MessageEmbed | MessageEmbedOptions);
    sendTo(...args: any[]): Embed;
    private _init;
}
