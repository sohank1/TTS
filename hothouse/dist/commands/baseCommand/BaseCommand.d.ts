import { Message } from "discord.js";
import { BaseCommandOptions } from "./BaseCommandOptions";
export declare abstract class BaseCommand {
    options: BaseCommandOptions;
    message: Message;
    constructor(options: BaseCommandOptions);
    abstract run(): void;
    setMessage(m: Message): void;
    static register(dir: string): Promise<void>;
}
export declare const commands: BaseCommand[];
