import { Injectable } from "@angular/core";
import { ContentService } from "./content/content.service";
import { UserService } from "./user/user.service";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class HttpService {
    constructor(public user: UserService, public content: ContentService) {}
}
