import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.scss']
})
export class WishlistPageComponent implements OnInit {

  itemInCart:any;

  constructor(private itemAPIs:ItemService, private authAPIs:AuthService) { }

  ngOnInit(): void {
    this.authAPIs.checkToken();
    this.itemInCart = this.itemAPIs.getItemsInCart();
    console.log("itemInCart:",this.itemInCart)
  }

  removeItemInWishList(selected:any){
    console.log("selected:",selected._id)
    this.itemAPIs.removeItem(selected._id);
    this.itemInCart =  this.itemInCart.filter((item: any)  => item._id !== selected._id );
  }
}
