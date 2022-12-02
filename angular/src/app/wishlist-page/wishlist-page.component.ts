import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.scss']
})
export class WishlistPageComponent implements OnInit {

  items: any;
  id: any;
  constructor(private itemAPIs: ItemService, private authAPIs: AuthService) { }

  ngOnInit(): void {
    this.id = this.authAPIs.getUserID()
    this.authAPIs.checkToken();
    this.itemAPIs.getItemsByUserID(this.id).subscribe((res) => {
      console.log(res)
      if (res) {
        return this.items = res.map((item: any) => item.item_id);;
      }
      return [];
    });
  }

  removeItemInWishList(selected: any) {
    this.itemAPIs.deleteItemsInWishList(selected, this.id).subscribe((res) => {
      console.log(res)
      if (res) {
        window.location.reload();
      }
      return [];
    });
  }
}
