import { forwardRef, Inject } from "@nestjs/common";
import {
    OnGatewayConnection,
    WebSocketGateway as WebSocketGatewayDecorator,
    WebSocketServer,
    OnGatewayInit,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { AuthWebSocket } from "../auth/auth.ws";
import { UserWebSocket } from "../user/user.ws";
import { AuthService } from "../auth/auth.service";
import { GuildService } from "../guild/guild.service";
// import { UserResponseObject } from "../user/types/UserResponseObject";
import { UserService } from "../user/user.service";
// import { OpCodes } from "./OpCodes";
import { GuildWebSocket } from "../guild/guild.ws";
import { ConnectionHandler } from "./ConnectionHandler";

@WebSocketGatewayDecorator()
export class WebSocketGateway implements OnGatewayInit, OnGatewayConnection {
    @WebSocketServer()
    public server: Server;
    public connectionHandler: ConnectionHandler;

    public constructor(
        @Inject(forwardRef(() => AuthService))
        private _auth: AuthService,
        private _userService: UserService,
        private _guildService: GuildService
    ) {}
    public afterInit(server: Server) {
        this.connectionHandler = new ConnectionHandler(server);
    }

    public handleConnection(socket: Socket) {
        new AuthWebSocket(socket, this._auth, this._userService);
        new UserWebSocket(socket, this._userService);
        new GuildWebSocket(socket, this._guildService);
    }
}
