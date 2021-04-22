import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from "./views/home/home.component";
import { JourneysComponent } from './views/journeys/journeys.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "journeys",
    component: JourneysComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
