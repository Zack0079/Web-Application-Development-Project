import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  items: Array<any> = [];
  id: any;

  constructor(private itemAPIs: ItemService, private authAPIs: AuthService) { }

  ngOnInit(): void {
    this.id = this.authAPIs.getUserID()

    this.itemAPIs.getOrder(this.id).subscribe((res) => {
      if (res.result && res.result.length > 0) {
        console.log(res)

        let tmparray: Array<any> = [];
        let order_id = "";

        res.result.map((item: any, index: number) => {
          if (order_id != item.order_id) {
            index > 0 ? this.items.push(tmparray) : null;
            item.name = item.item_name;
            tmparray = [item];
            order_id = item.order_id;

          } else {
            item.name = item.item_name;
            tmparray.push(item)
          }

          if (index + 1 == res.result.length) {
            this.items.push(tmparray)
          }
          return;
        });
      }

      console.log(this.items)

      return [];
    });

  }

}
