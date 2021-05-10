import { Injectable } from "@angular/core";
import { MatDrawer } from "@angular/material/sidenav";
import { Router } from "@angular/router";
import { navLinks } from "./nav-links";

@Injectable()
export class NavService {
    public drawer: MatDrawer;

    public links = navLinks;
    // public classes = [];

    constructor(private router: Router) {}

    public setDrawer(drawer: MatDrawer): MatDrawer {
        return (this.drawer = drawer);
    }

    // public setClass(): void {
    //     for (const link of this.links)
    //         if (this.router.isActive(link.path, false))
    //             this.classes[link.name] = ['active']
    //         else this.classes = [];
    // }

    // public getClass(name: string): object {
    //     return this.classes[name];
    // }
}
