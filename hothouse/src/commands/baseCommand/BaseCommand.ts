import { promises as fs } from "fs";
import { join } from "path";
import { Message } from "discord.js";
import { BaseCommandOptions } from "./BaseCommandOptions";

export abstract class BaseCommand {
    public message: Message;

    constructor(public options: BaseCommandOptions) {
        // add the command name to the aliases
        if (!options.aliases) options.aliases = [options.name];
        else options.aliases.push(options.name);
    }

    public abstract run(): void;

    public setMessage(m: Message): void {
        this.message = m;
    }

    public static async register(dir: string): Promise<void> {
        const files = await fs.readdir(join(dir));

        for (const f of files) {
            if (
                (await fs.lstat(join(dir, f))).isDirectory() &&
                f !== "baseCommand"
            )
                this.register(join(dir, f));
            else if (f !== "baseCommand")
                try {
                    const { default: Command } = await import(join(dir, f));
                    commands.push(<BaseCommand>new Command());
                } catch (err) {
                    console.log(err);
                }
        }
    }
}

export const commands: BaseCommand[] = [];
