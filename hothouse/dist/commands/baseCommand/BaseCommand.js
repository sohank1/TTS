"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = exports.BaseCommand = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
class BaseCommand {
    constructor(options) {
        this.options = options;
        if (!options.aliases)
            options.aliases = [options.name];
        else
            options.aliases.push(options.name);
    }
    setMessage(m) {
        this.message = m;
    }
    static async register(dir) {
        const files = await fs_1.promises.readdir(path_1.join(dir));
        for (const f of files) {
            if ((await fs_1.promises.lstat(path_1.join(dir, f))).isDirectory() && f !== "baseCommand")
                this.register(path_1.join(dir, f));
            else if (f !== "baseCommand")
                try {
                    const { default: Command } = await Promise.resolve().then(() => require(path_1.join(dir, f)));
                    exports.commands.push(new Command());
                }
                catch (err) {
                    console.log(err);
                }
        }
    }
}
exports.BaseCommand = BaseCommand;
exports.commands = [];
//# sourceMappingURL=BaseCommand.js.map