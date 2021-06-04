import { UserResponseObject } from "axeroni";
import { TextChannel } from "discord.js";
import { Embed } from "../../client/embeds/Embed";
import { client } from "../../client/Client";
import { BaseWsEvent } from "./BaseWsEvent";

export default class LoginWsEvent extends BaseWsEvent {
    constructor() {
        super("logout");
    }

    public init(u: UserResponseObject): void {
        const c = <TextChannel>client.channels.cache.get("767763290004652037");
        new Embed().setAuthor(`${u.name} Logged Out or Disconnected`, u.avatarUrl).sendTo(c);
    }
}
