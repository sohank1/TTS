import { Component, OnInit } from "@angular/core";
import { NavService } from "src/app/components/nav/nav.service";
import { navLinks } from "src/app/components/nav/nav-links";
import { User } from "src/app/http/user/user.type";
import { HttpService } from "src/app/http/http.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss", "./animation.scss"],
})
export class HomeComponent implements OnInit {
    public user: User;
    public links = navLinks;

    constructor(
        private navBarService: NavService,
        private _http: HttpService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this._http.user.getMe().then((u) => (this.user = u));

        route.queryParams.subscribe((p) => {
            if (!p["accessToken"]) return;
            router.navigate(["dashboard"]);
            // if (localStorage.getItem("@tts/token")) return;
            localStorage.setItem("@tts/token", p["accessToken"]);
        });
    }

    public ngOnInit(): void {
        this._initAnimations();
    }

    public toggleDrawer(): void {
        this.navBarService.drawer.toggle();
    }

    private _initAnimations(): void {
        let i = 0;
        console.log(Array.from(document.querySelectorAll("article, .grid")));

        for (const a of Array.from(
            document.querySelectorAll("article, .grid")
        )) {
            i++;

            for (const e of Array.from(a.querySelectorAll("img, h1, p"))) {
                e.setAttribute("data-aos-duration", "750");
                i === 1 || i === 3
                    ? e.setAttribute("data-aos", "zoom-in-up")
                    : e.setAttribute("data-aos", "fade-up");
            }
        }
    }
}
