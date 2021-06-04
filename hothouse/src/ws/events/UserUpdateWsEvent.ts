import { UserResponseObject } from "axeroni";
import { TextChannel } from "discord.js";
import { Embed } from "../../client/embeds/Embed";
import { client } from "../../client/Client";
import { BaseWsEvent } from "./BaseWsEvent";

export default class UserUpdateWsEvent extends BaseWsEvent {
    constructor() {
        super("userUpdate");
    }

    public init(u: UserResponseObject): void {
        const c = <TextChannel>client.channels.cache.get("767763290004652037");
        new Embed()
            .setAuthor(`${u.name} Was Updated`, u.avatarUrl)
            .addField("Name", u.name)
            .addField("Tag", u.tag)
            .addField("Avatar URL", u.avatarUrl)
            .addField(
                "Json",
                `\`\`\`json\n${JSON.stringify(u, null, 2)}
             \`\`\``
            )
            .sendTo(c);
    }
}
