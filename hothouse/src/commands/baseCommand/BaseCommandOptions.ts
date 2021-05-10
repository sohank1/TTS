export interface BaseCommandOptions {
    name: string;
    type: string;
    info: string;
    activator: Activator;
    aliases?: string[];
}

export enum Activator {
    STARTS_WITH,
    EQUAL_TO,
}
