import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoadingComponent } from "./components/loading/loading.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { HomeComponent } from "./pages/home/home.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
    },
    {
        path: "dashboard",
        component: DashboardComponent,
    },
    {
        path: "bugs",
        component: DashboardComponent,
    },
    {
        path: "news",
        component: DashboardComponent,
    },
    {
        path: "patch-notes",
        component: DashboardComponent,
    },
    {
        path: "loading",
        component: LoadingComponent,
    },
    {
        path: "**",
        component: NotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
