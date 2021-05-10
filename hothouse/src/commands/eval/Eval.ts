import { Message, MessageEmbed } from "discord.js";
import { client } from "../../client/Client";
import { inspect } from "util";
import { Embed } from "../../client/embeds/Embed";
import { BaseCommand } from "../baseCommand/BaseCommand";
import { Activator } from "../baseCommand/BaseCommandOptions";

export default class Eval extends BaseCommand {
    constructor() {
        super({
            name: "Eval",
            info: "Owner command to evaluate code in the bot.",
            type: "test",
            activator: Activator.STARTS_WITH,
        });
        console.log("eval");
    }

    public async run(): Promise<Message> {
        const Client = client;
        const toEval = this.message.content.split(`${client.prefix}eval `)[1];

        try {
            if (this.message.author.id !== "481158632008974337")
                return this.message.channel.send(
                    "Only bot owner can use this comamnd."
                );

            console.log(this.message.content.split(`${client.prefix}eval `));
            const evaluated = eval(toEval);
            const hrStart = process.hrtime();
            let hrDiff: [number, number];
            hrDiff = process.hrtime(hrStart);

            const embed = new MessageEmbed()
                .setColor("GREEN")
                .setFooter(
                    `Evaluated in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ""}${
                        hrDiff[1] / 1000
                    }ms.`
                )
                .setTitle("Eval")
                .addField(
                    "To evaluate",
                    `\`\`\`javascript\n${toEval || "None"}\n\`\`\``
                )
                .addField(
                    "Evaluated",
                    `\`\`\`javascript\n${
                        inspect(evaluated, false, 1) || "None"
                    }\n\`\`\``
                )
                .addField("Type Of", typeof evaluated);
            await this.message.channel.send(embed).catch(async (e) => {
                const errembed = new MessageEmbed()
                    .setTitle("Error")
                    .setColor("RED")
                    .setFooter("Error while evaluating.")
                    .addField(
                        "To Evaluate",
                        `\`\`\`javascript\n${toEval || "None"}\n\`\`\``
                    )
                    .addField(
                        "Error",
                        `\`\`\`javascript\n${e.message || "None"}\n\`\`\``
                    );
                await this.message.channel.send(errembed);
            });
        } catch (error) {
            const errembed = new MessageEmbed()
                .setTitle("Error")
                .setColor("RED")
                .setFooter("Error while evaluating.")
                .addField(
                    "To Evaluate",
                    `\`\`\`javascript\n${toEval || "None"}\n\`\`\``
                )
                .addField(
                    "Error",
                    `\`\`\`javascript\n${error || "None"}\n\`\`\``
                );
            this.message.channel.send(errembed).catch(async (e) => {
                const errembed = new MessageEmbed()
                    .setTitle("Error")
                    .setColor("RED")
                    .setFooter("Error while evaluating.")
                    .addField(
                        "To Evaluate",
                        `\`\`\`javascript\n${toEval || "None"}\n\`\`\``
                    )
                    .addField(
                        "Error",
                        `\`\`\`javascript\n${e.message || "None"}\n\`\`\``
                    );
                await this.message.channel.send(errembed);
            });
        }
    }
}
