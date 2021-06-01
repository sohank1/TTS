"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Embed_1 = require("../../client/embeds/Embed");
const BaseCommand_1 = require("../baseCommand/BaseCommand");
const BaseCommandOptions_1 = require("../baseCommand/BaseCommandOptions");
class EmbedCommand extends BaseCommand_1.BaseCommand {
    constructor() {
        super({
            name: "Embed",
            info: "test for embed class",
            type: "test",
            activator: BaseCommandOptions_1.Activator.STARTS_WITH,
        });
    }
    async run() {
        new Embed_1.Embed()
            .setTitle(this.options.name)
            .setDescription(this.options.info)
            .addField("Name", this.options.name)
            .addField("Info", this.options.info)
            .addField("Type", this.options.type)
            .addField("Activator", this.options.activator.toString())
            .sendTo(this.message.channel);
        require("axios")
            .get("https://fortnite-api.com/v2/cosmetics/br")
            .then((r) => {
            const missing = [];
            r.data.data.forEach((c, i) => {
                if (c.shopHistory) {
                    console.log(i);
                    const date = new Date(c.shopHistory[c.shopHistory.length - 1]);
                    const differenceInDays = (Date.now() - date.getTime()) / (1000 * 3600 * 24);
                    console.log(date, differenceInDays);
                    if (differenceInDays >= 300)
                        missing.push(c);
                }
            });
            console.log(`missing: ${missing}. There are ${missing.length} missing cosmetics (haven't been seen in 300 days or more)`);
            missing.forEach((e, i) => this.message.channel.send(`${i}/${missing.length} Missing ${e.name} ${e.images.icon} Last Seen: ${new Date(e.shopHistory[e.shopHistory.length - 1]).toLocaleString()} There are ${missing.length} missing cosmetics (haven't been seen in 300 days or more)`));
        });
    }
}
exports.default = EmbedCommand;
//# sourceMappingURL=Embed.js.map