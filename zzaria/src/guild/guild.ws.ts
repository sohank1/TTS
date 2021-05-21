import { Socket } from "socket.io";
import { OpCodes } from "../ws/OpCodes";
import { GuildService } from "./guild.service";

export class GuildWebSocket {
    constructor(private socket: Socket, private _guildService: GuildService) {
        socket.on(OpCodes.GET_CONTENT, () => this.getTTS());
    }

    private async getTTS() {
        this.socket.emit(OpCodes.GET_CONTENT_FETCH_DONE, await this._guildService.getTTS());
    }
}
