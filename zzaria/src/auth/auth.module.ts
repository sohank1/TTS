import { HttpModule, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
// import { EventsModule } from 'src/events/events.module';
import { Guild, GuildSchema } from "../guild/guild.schema";
import { UserModule } from "../user/user.module";
import { User, UserSchema } from "../user/user.schema";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Guild.name, schema: GuildSchema },
        ]),
        PassportModule.register({ session: true }),
        HttpModule,
        // EventsModule,
        UserModule,
    ],
    exports: [AuthService],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
