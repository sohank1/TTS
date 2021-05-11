import { Controller, Delete, Get, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { CdnService } from "./cdn.service";
import { File } from "./file/file.schema";

@Controller("cdn")
export class CdnController {
    constructor(private _service: CdnService) {}

    @Get()
    public getAll(): Promise<File[]> {
        return this._service.getAll();
    }

    @Get(":file")
    public getFile(@Req() req: Request, @Res() res: Response): Promise<void> {
        return this._service.getFile(req, res);
    }

    @Delete(":file")
    public deleteFile(@Res() req: Request): Promise<{ message: string; status: number }> {
        return this._service.deleteFile(req);
    }

    @Post()
    public createFile(@Req() req: Request, @Res() res: Response): Promise<void> {
        //@ts-ignore
        return this._service.createFiles(req.files, res);
    }
}
