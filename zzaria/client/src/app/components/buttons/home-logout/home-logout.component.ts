import { Component } from "@angular/core";
import { environment } from "src/environments/environment";

@Component({
    selector: "app-home-logout",
    templateUrl: "./home-logout.component.html",
    styleUrls: ["./home-logout.component.scss"],
})
export class HomeLogoutComponent {
    public link = environment.httpEndpoints.LOGOUT;
}
