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
        // If testing return empty object because db doesn't have the user
        //  if (IS_TEST) this.GuildModel.findOne();
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
