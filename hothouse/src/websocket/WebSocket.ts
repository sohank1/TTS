import * as io from "socket.io-client";
import { Environment } from "../environment/Environment";
import { Events } from "./Events";

export class WebSocket {
    public socket = io(Environment.BASE_URL);

    constructor() {
        // console.log(this.socket)
        this.socket.on(Events.LOGIN, (data) => {
            console.log(this.socket);
            console.log(data);
        });
        this.socket.emit("test", "this is a message");
        this.socket.on("connection", () => console.log("connected"));
    }
}

export const websocket = new WebSocket();
