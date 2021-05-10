import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeComponent } from "./pages/home/home.component";
import { HamburgerComponent } from "./assets/icons/hamburger/hamburger.component";
import { MaterialModule } from "./material.module";
import { CloseComponent } from "./assets/icons/close/close.component";
import { LoginComponent } from "./components/buttons/login/login.component";
import { JoinComponent } from "./components/buttons/join/join.component";
import { NavBarComponent } from "./components/nav/nav-bar/nav-bar.component";
import { NavService } from "./components/nav/nav.service";
import { CommonModule } from "@angular/common";
import { JourneyComponent } from "./components/buttons/journey/journey.component";
import { FooterComponent } from "./components/footer/footer.component";
import { DashboardComponent as DashboardIconComponent } from "./assets/icons/dashboard/dashboard.component";
import { BugsComponent } from "./assets/icons/bugs/bugs.component";
import { NewsComponent } from "./assets/icons/news/news.component";
import { PatchNotesComponent } from "./assets/icons/patch-notes/patch-notes.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { DashboardNavComponent } from "./components/nav/dashboard-nav/dashboard-nav.component";
import { UserComponent } from "./components/user/user.component";
import { LogoutComponent } from "./components/buttons/logout/logout.component";
import { HttpClientModule } from "@angular/common/http";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { HomeLogoutComponent } from "./components/buttons/home-logout/home-logout.component";
import { LoadingComponent } from "./components/loading/loading.component";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HamburgerComponent,
        CloseComponent,
        LoginComponent,
        JoinComponent,
        NavBarComponent,
        JourneyComponent,
        FooterComponent,
        DashboardComponent,
        DashboardIconComponent,
        BugsComponent,
        NewsComponent,
        PatchNotesComponent,
        DashboardNavComponent,
        UserComponent,
        LogoutComponent,
        NotFoundComponent,
        HomeLogoutComponent,
        LoadingComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
    ],
    providers: [NavService],
    bootstrap: [AppComponent],
})
export class AppModule {}
