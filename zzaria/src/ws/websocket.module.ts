import { forwardRef, Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { GuildModule } from "../guild/guild.module";
import { UserModule } from "../user/user.module";
import { WebSocketGateway } from "./websocket.gateway";

@Module({
    imports: [UserModule, GuildModule, forwardRef(() => AuthModule)],
    exports: [WebSocketGateway],
    providers: [WebSocketGateway],
})
export class WebSocketModule {}
