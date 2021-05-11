import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Guild, GuildSchema } from "./guild.schema";
import { GuildController } from "./guild.controller";
import { GuildService } from "./guild.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Guild.name, schema: GuildSchema }])],
    exports: [GuildService],
    controllers: [GuildController],
    providers: [GuildService],
})
export class GuildModule {}
