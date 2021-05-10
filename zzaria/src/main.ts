import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
// import * as session from "express-session";
// import * as passport from "passport";
// import * as cookieParser from "cookie-parser";
// import * as fileUpload from "express-fileupload";
import { environment } from "./environment/environment";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.enableCors({
        origin: [
            "http://localhost:4200",
            "https://tts-api-prod.herokuapp.com",
            "https://ttsclan.vercel.app",
        ],
        credentials: true,
    });

    // app.use(cookieParser());
    // app.use(
    //     session({
    //         secret: "Testing",
    //         cookie: {
    //             maxAge: 60 * 1000 * 60 * 24,
    //         },
    //         resave: false,
    //         saveUninitialized: false,
    //     })
    // );

    // app.use(passport.initialize());
    // app.use(passport.session());
    // app.use(fileUpload());

    await app.listen(environment.PORT);
}
bootstrap();
