import { forwardRef, Inject } from "@nestjs/common";
import {
    OnGatewayConnection,
    WebSocketGateway as WebSocketGatewayDecorator,
    WebSocketServer,
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

@WebSocketGatewayDecorator()
export class WebSocketGateway implements OnGatewayConnection {
    @WebSocketServer()
    public server: Server;

    public constructor(
        @Inject(forwardRef(() => AuthService))
        private _auth: AuthService,
        private _userService: UserService,
        private _guildService: GuildService
    ) {}

    public handleConnection(socket: Socket) {
        new AuthWebSocket(socket, this._auth);
        new UserWebSocket(socket, this._userService);
        new GuildWebSocket(socket, this._guildService);
    }

    // public emitNewUser(user: UserResponseObject): boolean {
    //     return this.server.emit(OpCodes.NEW_USER, user);
    // }

    // public emitUserUpdate(user: UserResponseObject): boolean {
    //     return this.server.emit(OpCodes.USER_UPDATE, user);
    // }
}
