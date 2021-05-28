import { OpCodes, UserResponseObject } from "axeroni";
import { Server, Socket } from "socket.io";
import { TTS_BOT } from "../environment/environment";

interface Connection {
    userId?: string;
    getUser?: () => Promise<UserResponseObject>;
    isTTSBot?: boolean;
}

export const connections = new Map<string, Connection>();

export class ConnectionHandler {
    constructor(private server: Server) {
        this.server.on("connection", (socket: Socket) => {
            console.log(`${socket.id} connected`);
            connections.set(socket.id, {});

            socket.on("disconnect", async () => {
                console.log(`${socket.id} disconnected`);
                const conn = connections.get(socket.id);
                if (conn?.getUser) this.emitUserLogout(await conn.getUser());
                connections.delete(socket.id);
            });
        });
    }

    public emitUserLogin(user: UserResponseObject): void {
        this.server.to(TTS_BOT.ROOM).emit(OpCodes["auth:login"], user);
    }

    public emitUserLogout(user: UserResponseObject): void {
        this.server.to(TTS_BOT.ROOM).emit(OpCodes["auth:logout"], user);
    }

    public emitNewUser(user: UserResponseObject): void {
        this.server.to(TTS_BOT.ROOM).emit(OpCodes["user:new"], user);
    }

    public emitUserUpdate(user: UserResponseObject): void {
        this.server.emit(OpCodes["user:update"], user);
    }
}
