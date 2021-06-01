import { Client as DiscordClient, ClientOptions } from "discord.js";
export declare class Client extends DiscordClient {
    version: string;
    prefix: string;
    constructor(options?: ClientOptions);
    private _init;
}
export declare const client: Client;
