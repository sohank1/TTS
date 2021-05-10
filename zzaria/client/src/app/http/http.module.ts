import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpService } from "./http.service";
import { UserService } from "./user/user.service";
import { ContentService } from "./content/content.service";

@NgModule({
    declarations: [],
    imports: [CommonModule, HttpModule],
    providers: [HttpService, UserService, ContentService],
})
export class HttpModule {}
