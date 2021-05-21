import { HttpStatus } from "@nestjs/common";
import { Socket } from "socket.io";
import { OpCodes } from "../ws/OpCodes";
import { UserService } from "./user.service";

export class UserWebSocket {
    constructor(private socket: Socket, private _userService: UserService) {
        socket.on(OpCodes.GET_USER, (d) => this.get(d));
        socket.on(OpCodes.GET_USERS, () => this.getAll());
    }

    private async get(id: string) {
        try {
            const user = await this._userService.get(id);
            this.socket.emit(OpCodes.GET_USER_FETCH_DONE, user);
        } catch (e) {
            return this.socket.emit(OpCodes.GET_USER_FETCH_DONE, {
                error: {
                    message: "User not found",
                    code: HttpStatus.NOT_FOUND,
                },
            });
        }
    }

    private async getAll() {
        this.socket.emit(OpCodes.GET_USERS_FETCH_DONE, await this._userService.getAll());
    }
}
