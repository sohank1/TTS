import { Component, Input } from "@angular/core";
import { User } from "src/app/http/user/user.type";
import { NavService } from "../nav.service";

@Component({
    selector: "app-dashboard-nav",
    templateUrl: "./dashboard-nav.component.html",
    styleUrls: ["./dashboard-nav.component.scss"],
})
export class DashboardNavComponent {
    @Input()
    public user: User;
    public userTest: User = {
        avatarUrl:
            "https://cdn.discordapp.com/avatars/481158632008974337/d9712404dc60ea0f39712a91f7b914d4.png?size=2048",
        _id: "5fd0e32d087b692d04143ca1",
        id: "481158632008974337",
        tag: "Creeper#4717",
        name: "Creeper",
    };

    constructor(public navBarService: NavService) {}

    public toggleDrawer(): void {
        this.navBarService.drawer.toggle();
    }
}
