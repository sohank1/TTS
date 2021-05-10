import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { User } from "./user.type";
import { socket } from "../socket";
import { LiteralMapEntry } from "@angular/compiler/src/output/output_ast";

const { httpEndpoints: Endpoints } = environment;

@Injectable({
    providedIn: "root",
})
export class UserService {
    constructor(private _http: HttpClient) {}

    public async getMe(): Promise<User> {
        let data: User;
        // return await this._http.get<User>(Endpoints.ME, {
        //   withCredentials: true,
        //   headers: { "X-Access-Token": localStorage.getItem("@tts/token") }
        // }).toPromise();

        socket.emit("auth", {
            accessToken: localStorage.getItem("@tts/token"),
        });
        socket.on("auth-success", ({ user }: { user: User }) => {
            data = user;
        });

        return data;
    }
}
