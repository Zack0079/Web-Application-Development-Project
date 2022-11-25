import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ItemslistComponent } from './itemslist/itemslist.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ModifyItemComponent } from './modify-item/modify-item.component';

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "items", component: ItemslistComponent },
  { path: "item/:id", component: ItemDetailComponent },
  { path: "item", component: ModifyItemComponent },
  { path: "item/:id/update", component: ModifyItemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgbModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
