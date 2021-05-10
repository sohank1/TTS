import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { EventsModule } from "./events/events.module";
import { GuildModule } from "./guild/guild.module";
import { CdnModule } from "./cdn/cdn.module";

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_URI),
        AuthModule,
        UserModule,
        GuildModule,
        CdnModule,
        EventsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
