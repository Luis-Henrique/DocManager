import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";

export const DashboardRoute: Routes = [
    {
      path: '',
      component: DashboardComponent,
      data: {
        title: $localize`Dashboard`
      }
    }
];