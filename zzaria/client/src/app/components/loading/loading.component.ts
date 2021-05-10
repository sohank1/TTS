import { Component, Input, OnInit } from "@angular/core";
import { Meta } from "@angular/platform-browser";

@Component({
    selector: "app-loading",
    templateUrl: "./loading.component.html",
    styleUrls: ["./loading.component.scss"],
})
export class LoadingComponent implements OnInit {
    @Input() public stop: boolean;
    public class: string;
    public show = true;

    constructor(private _meta: Meta) {
        this._meta.updateTag({
            property: "og:description",
            content: "Waiting for server...",
        });
        this._meta.addTag({ property: "og:test", content: "Meta Tag Test" });
    }

    public ngOnInit(): void {
        setInterval(() => {
            if (this.class === "remove") return;
            if (this.stop) {
                // start the fade out animation
                this.class = "remove";
                console.log("fade-out");

                // after 1.6 seconds delete this component from the dom.
                setTimeout(() => {
                    this.show = false;
                    console.log("delete");
                }, 1700);
            }
        }, 100);
    }
}
