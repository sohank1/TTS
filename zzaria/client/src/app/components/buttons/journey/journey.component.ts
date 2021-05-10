import { Component } from "@angular/core";
import { inviteLink } from "../join/invite-link";

@Component({
    selector: "app-journey",
    templateUrl: "./journey.component.html",
    styleUrls: ["./journey.component.scss"],
})
export class JourneyComponent {
    public link = inviteLink;

    constructor() {}
}
