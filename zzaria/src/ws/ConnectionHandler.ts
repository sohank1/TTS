import { Server, Socket } from "socket.io";
import { TTS_BOT } from "../environment/environment";
import { UserResponseObject } from "../user/types/UserResponseObject";
import { OpCodes } from "./OpCodes";

interface Connection {
    userId?: string;
    getUser?: () => Promise<UserResponseObject>;
    isTTSBot?: boolean;
}

export const connections = new Map<string, Connection>();

export class ConnectionHandler {
    constructor(private server: Server) {
        this.server.on("connection", (socket: Socket) => {
            connections.set(socket.id, {});
            socket.on("disconnect", () => connections.delete(socket.id));
        });
    }

    public emitNewUser(user: UserResponseObject): void {
        this.server.to(TTS_BOT.ROOM).emit(OpCodes.NEW_USER, user);
    }

    public emitUserUpdate(user: UserResponseObject): void {
        this.server.to(TTS_BOT.ROOM).emit(OpCodes.USER_UPDATE, user);
    }
}
