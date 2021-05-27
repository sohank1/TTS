import { Controller, Get, Param, Req, Res } from "@nestjs/common";
import { UserResponseObject } from "@tts/axeroni";
import { Request, Response } from "express";
import { UserService } from "./user.service";

@Controller("api")
export class UserController {
    constructor(private _service: UserService) {}

    @Get("users")
    public getAll(): Promise<UserResponseObject[]> {
        return this._service.getAll();
    }

    @Get("user/:id")
    public get(@Param("id") id: string): Promise<UserResponseObject> {
        return this._service.get(id);
    }

    @Get("avatar/:id.png")
    public getAvatar(@Req() req: Request, @Res() res: Response) {
        return this._service.getAvatar(req, res);
    }
}
