import { Component } from "@angular/core";
import { environment } from "src/environments/environment";

@Component({
    selector: "app-logout",
    templateUrl: "./logout.component.html",
    styleUrls: ["./logout.component.scss"],
})
export class LogoutComponent {
    public link = environment.httpEndpoints.LOGOUT;
}
