import { Component } from "@angular/core";
import { routes } from "src/app/app-routing.module";
import { navLinks } from "src/app/components/nav/nav-links";
import { NavService } from "src/app/components/nav/nav.service";
import { HttpService } from "src/app/http/http.service";
import { User } from "src/app/http/user/user.type";

@Component({
    selector: "app-not-found",
    templateUrl: "./not-found.component.html",
    styleUrls: ["./not-found.component.scss"],
})
export class NotFoundComponent {
    public user: User;
    public links = navLinks;

    constructor(private navBarService: NavService, private _http: HttpService) {
        this._http.user.getMe().then((u) => (this.user = u));
    }

    public toggleDrawer(): void {
        this.navBarService.drawer.toggle();
    }
}
