import { OpCodes } from "@tts/axeroni";
import { Socket } from "socket.io";
import { GuildService } from "./guild.service";

export class GuildWebSocket {
    constructor(private socket: Socket, private _guildService: GuildService) {
        socket.on(OpCodes["content:get"], () => this.getTTS());
    }

    private async getTTS() {
        this.socket.emit(OpCodes["content:get:fetch_done"], await this._guildService.getTTS());
    }
}
