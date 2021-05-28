import { OpCode, UserResponseObject } from "axeroni";
import { Query } from "./Query";

export class Connection {
    public user: UserResponseObject = null;

    constructor(public socket: SocketIOClient.Socket) {}

    public close = () => this.socket.close();

    public fetch = (event: OpCode, payload?: unknown, serverEvent?: OpCode): Promise<any> => {
        return new Promise((resFetch, rejFetch) => {
            if (payload) this.socket.emit(event, payload);
            else this.socket.emit(event);

            this.socket.on(serverEvent || `${event}:fetch_done`, (d: { error?: Error }) => {
                if (d.error) rejFetch(d.error);
                resFetch(d);
            });
        });
    };

    public query = new Query(this.fetch);
}
