import { HttpStatus } from "@nestjs/common";
import { OpCodes } from "@tts/axeroni";
import { Socket } from "socket.io";
import { UserService } from "./user.service";

export class UserWebSocket {
    constructor(private socket: Socket, private _userService: UserService) {
        socket.on(OpCodes["user:get"], (d) => this.get(d));
        socket.on(OpCodes["user:get_all"], () => this.getAll());
    }

    private async get(id: string) {
        try {
            const user = await this._userService.get(id);
            this.socket.emit(OpCodes["user:get:fetch_done"], user);
        } catch (e) {
            return this.socket.emit(OpCodes["user:get:fetch_done"], {
                error: {
                    message: "User not found",
                    code: HttpStatus.NOT_FOUND,
                },
            });
        }
    }

    private async getAll() {
        this.socket.emit(OpCodes["user:get_all:fetch_done"], await this._userService.getAll());
    }
}
