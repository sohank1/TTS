import { User } from "./entities";

export type Token = string;

export interface Connection {
    socket: SocketIOClient.Socket;
    user: User;
    close: () => void;
    fetch: (
        event: string,
        data?: unknown,
        serverEvent?: string
    ) => Promise<any>;
}

export interface Error {
    message: string;
    code: number;
}
