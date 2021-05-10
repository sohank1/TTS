import { HttpStatus } from "@nestjs/common";
import {
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { AuthService } from "../auth/auth.service";
import { GuildService } from "../guild/guild.service";
import { UserResponseObject } from "../user/types/UserResponseObject";
import { UserService } from "../user/user.service";
import { Events } from "./events";

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection {
    @WebSocketServer()
    public server: Server;

    public constructor(
        private _auth: AuthService,
        private _userService: UserService,
        private _guildService: GuildService
    ) {}

    public handleConnection(socket: Socket) {
        console.log(`Client connected: ${socket.id}`);

        socket.on("auth", async ({ accessToken }: { accessToken: string }) => {
            let user: UserResponseObject;

            try {
                user = await this._auth.me(accessToken);
            } catch (err) {
                return socket.emit("auth-error", {
                    error: {
                        message: "Invalid token",
                        code: HttpStatus.BAD_REQUEST,
                    },
                });
            }

            socket.emit("auth-success", user);
        });

        socket.on("get-user", async (id: string) => {
            let user: UserResponseObject;

            try {
                user = await this._userService.get(id);
            } catch {}

            if (!user)
                return socket.emit("fetch-done:get-user", {
                    error: {
                        message: "User not found",
                        code: HttpStatus.NOT_FOUND,
                    },
                });

            socket.emit("fetch-done:get-user", user);
        });

        socket.on("get-users", async () => {
            socket.emit(
                "fetch-done:get-users",
                await this._userService.getAll()
            );
        });

        socket.on("get-content", async () => {
            socket.emit(
                "fetch-done:get-content",
                await this._guildService.getTTS()
            );
        });
    }

    public emitNewUser(user: UserResponseObject): boolean {
        return this.server.emit(Events.NEW_USER, user);
    }

    public emitUserUpdate(user: UserResponseObject): boolean {
        return this.server.emit(Events.USER_UPDATE, user);
    }

    @SubscribeMessage("message")
    public handleMessage(client: Socket, message: string): void {
        client.emit("message", "got your message " + message);
        client.broadcast.emit("message", "a guy sent me a message");
    }
}
