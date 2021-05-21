import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Guild } from "./guild.schema";

@Injectable()
export class GuildService {
    constructor(
        @InjectModel(Guild.name)
        private GuildModel: Model<Guild>
    ) {}

    public async getTTS(): Promise<Guild | any> {
        return (
            (await this.GuildModel.findOne()) || {
                error: {
                    message: "Content not found",
                    code: HttpStatus.NOT_FOUND,
                },
            }
        );
    }
}
