import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { GuildModule } from "src/guild/guild.module";
import { UserModule } from "src/user/user.module";
import { EventsGateway } from "./events.gateway";

@Module({
    imports: [AuthModule, UserModule, GuildModule],
    // exports: [EventsGateway],
    providers: [EventsGateway],
})
export class EventsModule {}
