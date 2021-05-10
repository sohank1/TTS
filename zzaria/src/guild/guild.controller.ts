import { Controller, Get } from "@nestjs/common";
import { Guild } from "./guild.schema";
import { GuildService } from "./guild.service";

@Controller("api/content")
export class GuildController {
    constructor(private _service: GuildService) {}

    @Get()
    public getTTS(): Promise<Guild> {
        return this._service.getTTS();
    }
}
