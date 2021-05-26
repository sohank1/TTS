import { User } from "./entities";

export class Connection {
    constructor(public socket: SocketIOClient.Socket, public user: User) {}

    public close(): void {
        this.socket.close();
    }

    public fetch(event: string, payload?: unknown, serverEvent?: string): Promise<any> {
        return new Promise((resFetch, rejFetch) => {
            if (payload) this.socket.emit(event, payload);
            else this.socket.emit(event);

            this.socket.on(serverEvent || `fetch-done:${event}`, (d: { error?: Error }) => {
                if (d.error) rejFetch(d.error);
                resFetch(d);
            });
        });
    }
}
