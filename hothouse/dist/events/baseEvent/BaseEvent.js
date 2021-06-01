"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEvent = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
class BaseEvent {
    constructor() {
        this.init();
    }
    static async register(dir) {
        const files = await fs_1.promises.readdir(path_1.join(dir));
        for (const f of files) {
            if ((await fs_1.promises.lstat(path_1.join(dir, f))).isDirectory() && f !== "baseEvent")
                this.register(path_1.join(dir, f));
            else if (f !== "baseEvent")
                try {
                    const { default: Event } = await Promise.resolve().then(() => require(path_1.join(dir, f)));
                    new Event();
                }
                catch (err) {
                    console.log(err);
                }
        }
    }
}
exports.BaseEvent = BaseEvent;
//# sourceMappingURL=BaseEvent.js.map