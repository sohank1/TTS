import { Client as DiscordClient, ClientOptions } from "discord.js";

export class Client extends DiscordClient {
    public version = "beta v2.0";
    public prefix = "t%";

    constructor(options?: ClientOptions) {
        super(options);
        this._init();
    }

    private _init(): void {
        this.login(process.env.BOT_TOKEN);
        this.on("ready", () => console.log(`${this.user.tag} logged in`));
    }
}

export const client = new Client();
