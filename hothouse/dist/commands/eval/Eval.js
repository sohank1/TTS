"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Client_1 = require("../../client/Client");
const util_1 = require("util");
const BaseCommand_1 = require("../baseCommand/BaseCommand");
const BaseCommandOptions_1 = require("../baseCommand/BaseCommandOptions");
class Eval extends BaseCommand_1.BaseCommand {
    constructor() {
        super({
            name: "Eval",
            info: "Owner command to evaluate code in the bot.",
            type: "test",
            activator: BaseCommandOptions_1.Activator.STARTS_WITH,
        });
        console.log("eval");
    }
    async run() {
        const Client = Client_1.client;
        const toEval = this.message.content.split(`${Client_1.client.prefix}eval `)[1];
        try {
            if (this.message.author.id !== "481158632008974337")
                return this.message.channel.send("Only bot owner can use this comamnd.");
            console.log(this.message.content.split(`${Client_1.client.prefix}eval `));
            const evaluated = eval(toEval);
            const hrStart = process.hrtime();
            let hrDiff;
            hrDiff = process.hrtime(hrStart);
            const embed = new discord_js_1.MessageEmbed()
                .setColor("GREEN")
                .setFooter(`Evaluated in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ""}${hrDiff[1] / 1000}ms.`)
                .setTitle("Eval")
                .addField("To evaluate", `\`\`\`javascript\n${toEval || "None"}\n\`\`\``)
                .addField("Evaluated", `\`\`\`javascript\n${util_1.inspect(evaluated, false, 1) || "None"}\n\`\`\``)
                .addField("Type Of", typeof evaluated);
            await this.message.channel.send(embed).catch(async (e) => {
                const errembed = new discord_js_1.MessageEmbed()
                    .setTitle("Error")
                    .setColor("RED")
                    .setFooter("Error while evaluating.")
                    .addField("To Evaluate", `\`\`\`javascript\n${toEval || "None"}\n\`\`\``)
                    .addField("Error", `\`\`\`javascript\n${e.message || "None"}\n\`\`\``);
                await this.message.channel.send(errembed);
            });
        }
        catch (error) {
            const errembed = new discord_js_1.MessageEmbed()
                .setTitle("Error")
                .setColor("RED")
                .setFooter("Error while evaluating.")
                .addField("To Evaluate", `\`\`\`javascript\n${toEval || "None"}\n\`\`\``)
                .addField("Error", `\`\`\`javascript\n${error || "None"}\n\`\`\``);
            this.message.channel.send(errembed).catch(async (e) => {
                const errembed = new discord_js_1.MessageEmbed()
                    .setTitle("Error")
                    .setColor("RED")
                    .setFooter("Error while evaluating.")
                    .addField("To Evaluate", `\`\`\`javascript\n${toEval || "None"}\n\`\`\``)
                    .addField("Error", `\`\`\`javascript\n${e.message || "None"}\n\`\`\``);
                await this.message.channel.send(errembed);
            });
        }
    }
}
exports.default = Eval;
//# sourceMappingURL=Eval.js.map