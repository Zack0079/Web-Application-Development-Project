import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  title:string = "Payment";
  id: any;
  address: string = "";
  recipient: string ="";
  total_price: number = 0;
  card: String = "";

  constructor(private itemAPIs: ItemService, private authAPIs: AuthService) { }

  ngOnInit(): void {
    this.id = this.authAPIs.getUserID()
    this.authAPIs.checkToken();
  }

  onSubmit() {
    // let funFunction;
    
    // if (this.itemId) {
    //   funFunction = this.itemAPIs.updateItemByID(this.itemId, this.item)
    // } else {
    //   funFunction = this.itemAPIs.createItem(this.item)
    // }

    // funFunction.subscribe((res) => {
    //   console.log(res)
    //   if(res && res.item && res.item){
    //     this.router.navigate(["/product"])
    //   }else{
    //     //TODO: Error handle
    //   }
      
    // });
  }

}
