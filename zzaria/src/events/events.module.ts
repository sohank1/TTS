import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { GuildModule } from "../guild/guild.module";
import { UserModule } from "../user/user.module";
import { EventsGateway } from "./events.gateway";

@Module({
    imports: [AuthModule, UserModule, GuildModule],
    // exports: [EventsGateway],
    providers: [EventsGateway],
})
export class EventsModule {}
