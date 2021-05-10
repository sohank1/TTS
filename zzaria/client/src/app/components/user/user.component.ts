import { Component, Input } from "@angular/core";
import { Content, Role } from "src/app/http/content/content.type";
import { HttpService } from "src/app/http/http.service";
import { User } from "src/app/http/user/user.type";
import { UserAnimation } from "./user.animation";

@Component({
    selector: "app-user",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.scss", "./user.detail.scss"],
    animations: UserAnimation,
})
export class UserComponent {
    @Input()
    public user: User;

    public roles: Role[] = [];

    public isShowing = false;
    public get state(): string {
        return this.isShowing ? "show" : "remove";
    }
    public get class(): string {
        return this.roles.length <= 3 ? "three" : "";
    }

    constructor(private _http: HttpService) {
        this._http.content.get().then((c) => {
            this.roles = c.members.find((m) => m.id === this.user.id).roles;
            // this.convertColors();
        });
    }

    public toggle(): void {
        this.isShowing = !this.isShowing;
    }

    private convertColors(): void {
        //@ts-ignore
        for (const r of this.roles)
            r.color = this.getHexString(<number>r.color);
    }

    /**
     * Takes an RBG Integer 16744987 and returns an RBG String rgb(255, 130, 27);
     * @param rbgInt - The RBG Integer
     */
    private getRgbString(rbgInt: number): string {
        const red = (rbgInt >> 16) & 255;
        const green = (rbgInt >> 8) & 255;
        const blue = rbgInt & 255;

        return `rgb(${red}, ${green}, ${blue})`;
    }

    /**
     * Takes a RBG Integer 16744987 and returns a Hex Code #ff821b;
     * @param rbgInt - The RBG Integer
     */
    private getHexString(rbgInt: number): string {
        return `#${rbgInt.toString(16).padStart(6, "0")}`;
    }
}
