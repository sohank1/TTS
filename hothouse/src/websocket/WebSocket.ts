import * as io from "socket.io-client";
import { Environment } from "../environment/Environment";
// import { Events } from "./Events";

export class WebSocket {
    public socket = io(Environment.BASE_URL);

    constructor() {
        this.socket.emit("auth", { refreshToken: process.env.REFRESH_TOKEN, accessToken: process.env.ACCESS_TOKEN });
        // console.log(this.socket)
        // this.socket.on(Events.LOGIN, (data) => {
        //     console.log(this.socket);
        //     console.log(data);
        // });
        this.socket.on("message", (d) => console.log(d));
        this.socket.on("connect", () => console.log("connected"));
        this.socket.on("auth-success", (d) => console.log(d));
        this.socket.on("auth-error", (d) => console.log(d));
    }
}

export const websocket = new WebSocket();
