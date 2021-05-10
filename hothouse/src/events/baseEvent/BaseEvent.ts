import { promises as fs } from "fs";
import { join } from "path";

export abstract class BaseEvent {
    constructor() {
        this.init();
    }

    public abstract init(): void;

    public static async register(dir: string): Promise<void> {
        const files = await fs.readdir(join(dir));

        for (const f of files) {
            if (
                (await fs.lstat(join(dir, f))).isDirectory() &&
                f !== "baseEvent"
            )
                this.register(join(dir, f));
            else if (f !== "baseEvent")
                try {
                    const { default: Event } = await import(join(dir, f));
                    <BaseEvent>new Event();
                } catch (err) {
                    console.log(err);
                }
        }
    }
}
