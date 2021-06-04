import { Subscription } from "crustina";
import { promises as fs } from "fs";
import { join } from "path";
import { useConn } from "../conn";

export abstract class BaseWsEvent {
    constructor(k: keyof Subscription) {
        useConn().on[k](this.init);
    }

    public abstract init(...args: any[]): any;

    public static async register(dir: string): Promise<void> {
        const files = await fs.readdir(join(dir));

        for (const f of files) {
            if ((await fs.lstat(join(dir, f))).isDirectory() && f !== "baseWsEvent") this.register(join(dir, f));
            else if (f !== "baseWsEvent")
                try {
                    const { default: Event } = await import(join(dir, f));
                    <BaseWsEvent>new Event();
                } catch (err) {}
        }
    }
}
