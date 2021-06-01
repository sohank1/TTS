export type Token = string;

export interface Error {
    message: string;
    code: number;
}

export type ListenerHandler<Data = unknown> = (data: Data) => void;
