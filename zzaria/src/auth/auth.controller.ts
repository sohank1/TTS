/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller, Get, HttpException, HttpStatus, Query, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { UserResponseObject } from "../user/types/UserResponseObject";

@Controller("api")
export class AuthController {
    constructor(private service: AuthService) {}

    @Get("login")
    // @UseGuards(LoginAuthGuard)
    public async login(@Res() res: Response): Promise<void> {
        return this.service.login(res);
    }

    @Get("login/redirect")
    // @UseGuards(LoginAuthGuard)
    public async redirect(@Req() req: Request, @Res() res: Response): Promise<void> {
        return this.service.redirect(req, res);
    }

    @Get("logout")
    public logout(@Req() req: Request, @Res() res: Response): void {
        return this.service.logout(req, res);
    }

    @Get("me")
    public async me(@Req() req: Request): Promise<UserResponseObject> {
        if (!req.header("X-Access-Token") || !req.header("X-Refresh-Token"))
            throw new HttpException("No credentials provided", HttpStatus.BAD_REQUEST);

        let d;

        try {
            d = await this.service.me(req.header("X-Access-Token"), req.header("X-Refresh-Token"));
        } catch {
            throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }

        return d.user;
    }

    @Get("test/login")
    public testLogin(
        @Query("type") type: "tokens",
        @Req() res: Response
    ): Promise<void | { accessToken: string; refreshToken: string }> {
        return this.service.loginWithTestUser(type, res);
    }
}
