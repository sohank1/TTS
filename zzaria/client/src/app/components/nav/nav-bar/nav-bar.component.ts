import { AfterViewInit, Component, Input, ViewChild } from "@angular/core";
import { MatDrawer } from "@angular/material/sidenav";
import { User } from "src/app/http/user/user.type";
import { NavService } from "../nav.service";

@Component({
    selector: "app-nav-bar",
    templateUrl: "./nav-bar.component.html",
    styleUrls: ["./nav-bar.component.scss"],
})
export class NavBarComponent implements AfterViewInit {
    @ViewChild("drawer")
    private drawerRef: MatDrawer;

    @Input()
    public user: User;

    constructor(public navBarService: NavService) {}

    public async ngAfterViewInit(): Promise<void> {
        this.navBarService.setDrawer(this.drawerRef);
    }
}
