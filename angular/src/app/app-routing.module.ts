import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ItemslistComponent } from './itemslist/itemslist.component';

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "items", component: LandingPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgbModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
