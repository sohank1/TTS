import { HttpModule, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CdnController } from "./cdn.controller";
import { CdnService } from "./cdn.service";
import { File, FileSchema } from "./file/file.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
        HttpModule,
    ],
    controllers: [CdnController],
    providers: [CdnService],
})
export class CdnModule {}
