import { OpCode, UserResponseObject } from "axeroni";
import { Query } from "./Query";
import { Subscription } from "./Subscription";
import { ListenerHandler } from "./types";

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

    public addListener: <Data = unknown>(opCode: OpCode, handler: ListenerHandler<Data>) => SocketIOClient.Emitter = (
        opCode,
        handler
    ) => {
        return this.socket.on(opCode, (d) => handler(d));
    };

    public query = new Query(this);
    public on = new Subscription(this);
}
