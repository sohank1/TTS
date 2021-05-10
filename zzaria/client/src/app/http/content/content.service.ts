import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Content } from "./content.type";

const { httpEndpoints: Endpoints } = environment;

@Injectable({
    providedIn: "root",
})
export class ContentService {
    constructor(private _http: HttpClient) {}

    public async get(): Promise<Content> {
        return this._http.get<Content>(Endpoints.CONTENT).toPromise();
    }
}
