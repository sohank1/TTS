export interface BaseCommandOptions {
    name: string;
    type: string;
    info: string;
    activator: Activator;
    aliases?: string[];
}
export declare enum Activator {
    STARTS_WITH = 0,
    EQUAL_TO = 1
}
