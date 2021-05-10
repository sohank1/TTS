import { Component } from "@angular/core";
import { inviteLink } from "./invite-link";

@Component({
    selector: "app-join",
    templateUrl: "./join.component.html",
    styleUrls: ["./join.component.scss"],
})
export class JoinComponent {
    public link = inviteLink;
}
