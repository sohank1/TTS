import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Guild } from "./guild.schema";

@Injectable()
export class GuildService {
    constructor(
        @InjectModel(Guild.name)
        private GuildModel: Model<Guild>
    ) {}

    public async getTTS(): Promise<Guild> {
        const tts = await this.GuildModel.findOne();
        if (!tts)
            throw new HttpException(
                "TTS content was not found",
                HttpStatus.INTERNAL_SERVER_ERROR
            );

        return tts;
    }
}
