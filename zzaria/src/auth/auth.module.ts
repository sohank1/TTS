import { HttpModule, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
// import { EventsModule } from 'src/events/events.module';
import { Guild, GuildSchema } from "src/guild/guild.schema";
import { UserModule } from "src/user/user.module";
import { User, UserSchema } from "src/user/user.schema";
import { AuthController } from "./auth.controller";
import { AuthSerializer } from "./auth.serializer";
import { AuthService } from "./auth.service";
import { AuthStrategy } from "./auth.strategy";
import { LoginAuthGuard } from "./login-auth.guard";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Guild.name, schema: GuildSchema },
        ]),
        JwtModule.register({
            secret: process.env.JWT_SECERT,
            signOptions: { expiresIn: "60s" },
        }),
        PassportModule.register({ session: true }),
        HttpModule,
        // EventsModule,
        UserModule,
    ],
    exports: [AuthService],
    providers: [
        AuthService,
        // AuthStrategy, AuthSerializer,
        //LoginAuthGuard
    ],
    controllers: [AuthController],
})
export class AuthModule {}
