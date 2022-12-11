import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ItemslistComponent } from './itemslist/itemslist.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ModifyItemComponent } from './modify-item/modify-item.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WishlistPageComponent } from './wishlist-page/wishlist-page.component';
import { ProductPageComponent } from './product-page/product-page.component';

import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { RowItemListComponent } from './partials/row-item-list/row-item-list.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderComponent } from './order/order.component';
import { CreditCardDirectivesModule } from 'angularx-cc-library';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HeaderComponent,
    ItemslistComponent,
    ItemDetailComponent,
    ModifyItemComponent,
    FooterComponent,
    CartPageComponent,
    LoginComponent,
    RegisterComponent,
    WishlistPageComponent,
    ProductPageComponent,
    RowItemListComponent,
    PaymentComponent,
    OrderComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CreditCardDirectivesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
