import { Message } from "discord.js";
import { BaseCommand } from "../baseCommand/BaseCommand";
export default class Eval extends BaseCommand {
    constructor();
    run(): Promise<Message>;
}
