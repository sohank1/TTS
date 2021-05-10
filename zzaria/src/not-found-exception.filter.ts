import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    NotFoundException,
} from "@nestjs/common";
import { resolve } from "path";

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(_exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        res.sendFile(resolve("./client/dist/TTS-Client/index.html"));
    }
}
