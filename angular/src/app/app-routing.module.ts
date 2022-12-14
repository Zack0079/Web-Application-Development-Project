import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ItemslistComponent } from './itemslist/itemslist.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ModifyItemComponent } from './modify-item/modify-item.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WishlistPageComponent } from './wishlist-page/wishlist-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "items", component: LandingPageComponent },
  { path: "item/:id", component: ItemDetailComponent },
  { path: "item", component: ModifyItemComponent },
  { path: "item/:id/update", component: ModifyItemComponent },
  { path: "cart", component: CartPageComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: RegisterComponent },
  { path: "wishlist", component: WishlistPageComponent },
  { path: "product", component: ProductPageComponent },
  { path: "payment", component: PaymentComponent },
  { path: "order", component: OrderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgbModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
