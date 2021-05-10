import { Component } from "@angular/core";
import { environment } from "src/environments/environment";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
    public link = environment.httpEndpoints.LOGIN;
}
