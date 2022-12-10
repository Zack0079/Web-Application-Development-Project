import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})

export class CartPageComponent implements OnInit {

  itemInCart:any;

  constructor(private itemAPIs:ItemService) { }

  ngOnInit(): void {
    this.itemInCart = this.itemAPIs.getItemsInCart();
    console.log("itemInCart:",this.itemInCart)
  }

  removeItemInCart(selected:any){
    console.log("selected:",selected._id)
    this.itemAPIs.removeItem(selected._id);
    this.itemInCart =  this.itemInCart.filter((item: any)  => item._id !== selected._id );
  }

  updateQuantify(selected:any){
    this.itemAPIs.updateQuantifyInCart(selected._id, selected.quantify);
  }
}
