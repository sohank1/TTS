export declare abstract class BaseEvent {
    constructor();
    abstract init(): void;
    static register(dir: string): Promise<void>;
}
