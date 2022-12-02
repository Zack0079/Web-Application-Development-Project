import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  items:any;
  shopId:string = "";

  constructor(private authAPIs: AuthService, private itemAPIs: ItemService) {
    this.authAPIs.checkToken();
    this.shopId = this.authAPIs.getUserID();
  }

  ngOnInit(): void {    
    this.itemAPIs.getItemsByShopID(this.shopId).subscribe((res) => {
      // console.log(res)
      if(res){
        return this.items = res;
      }
      return [];
    });
    // console.log(this.items)

  }

  // removeItemInCart(selected:any){
  //   // console.log("selected:",selected._id)
  //   this.itemAPIs.removeItem(selected._id);
  //   this.itemInCart =  this.itemInCart.filter((item: any)  => item._id !== selected._id );
  // }
}
