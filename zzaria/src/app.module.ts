import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { WebSocketModule } from "./ws/websocket.module";
import { GuildModule } from "./guild/guild.module";
import { CdnModule } from "./cdn/cdn.module";

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_URI),
        AuthModule,
        UserModule,
        GuildModule,
        CdnModule,
        WebSocketModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
