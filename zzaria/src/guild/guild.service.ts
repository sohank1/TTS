import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IS_TEST } from "../environment/environment";
import { Guild } from "./guild.schema";

@Injectable()
export class GuildService {
    constructor(
        @InjectModel(Guild.name)
        private GuildModel: Model<Guild>
    ) {}

    public async getTTS(): Promise<Guild> {
        // If testing return empty object because db doesn't have the user
        if (IS_TEST) this.GuildModel.findOne();

        const tts = await this.GuildModel.findOne();
        if (!tts) throw new HttpException("TTS content was not found", HttpStatus.INTERNAL_SERVER_ERROR);

        return tts;
    }
}
