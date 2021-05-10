import { Component, Input } from "@angular/core";
import { footerLinks } from "./footer-links";

@Component({
    selector: "app-footer",
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {
    @Input()
    public color: "bg" | "bg-alt";

    public links = footerLinks;

    constructor() {}
}
