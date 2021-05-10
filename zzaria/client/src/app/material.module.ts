import { NgModule } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";

const imports = [
    MatProgressBarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
];

@NgModule({
    imports: [...imports],
    exports: [...imports],
})
export class MaterialModule {}
