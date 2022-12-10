import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ItemService } from '../services/item.service';
import {  Router } from '@angular/router';
const { v4: uuidv4 } = require('uuid');

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})

export class PaymentComponent implements OnInit {
  title: string = "Payment";
  id: any;
  address: string = "";
  recipient: string = "";
  cardholder: string = "";
  total_price: number = 0;

  cardNumber: any = "";
  cardExpiry: any = "";
  cardCvc: any = "";
  itemInCart: Array<any> = [];
  selectedArray: Array<any> = [];

  saveAsDefault: boolean = false;

  constructor(private itemAPIs: ItemService, private authAPIs: AuthService,  private router: Router) { }

  ngOnInit(): void {
    this.authAPIs.checkToken();

    this.itemInCart = this.itemAPIs.getItemsInCart();

    new Promise((resolve, reject) => {
      this.itemInCart.forEach((item, index, array) => {
        return this.itemAPIs.getItemByID(item._id, true).subscribe((res) => {
          this.itemInCart[index].price = res
          this.total_price += res * this.itemInCart[index].quantify;
          this.selectedArray.push(true)
          if (index === array.length - 1) { resolve("") }
        })
      });
    }).then((res) =>
      this.itemAPIs.setCart(this.itemInCart)
    )

    new Promise((resolve, reject) => {
      this.id = this.authAPIs.getUserID();
      resolve(this.id)
    }).then((res) => {
      this.authAPIs.getUserShip(this.id).subscribe((result) => {
        if (result) {
          this.address = result.address ? result.address : "";
          this.recipient = result.recipient ? result.recipient : "";
        }
        return;
      });
    });
  }

  onSubmit() {
    if (this.saveAsDefault) {
      let obj = {
        "address": this.address,
        "recipient": this.recipient
      }
      this.authAPIs.updateUserAddress(this.id, obj).subscribe((res) => {
        console.log(res)
        if (res && res.item && res.item) {
          // this.router.navigate(["/product"])
        } else {
          //TODO: Error handle
        };
      });
    }
    // console.log(this.selectedArray);
 
    let tmpArray: any[] = [];
    let uuid = uuidv4();

    new Promise((resolve, reject) => {
      this.selectedArray.forEach((value, index,array) => {
        if (value) {
          let tmpItem = this.itemInCart[index]
          tmpArray.push({
            order_id: uuid,
            user_id: this.id,
            item_id: tmpItem._id,
            item_name: tmpItem.name,
            quantify: tmpItem.quantify,
            price: tmpItem.price,
          })
        }
        if (index === array.length - 1) { resolve("") }
      });
    }).then((res) => {
      return this.itemAPIs.postOrder(tmpArray).subscribe((res) => {
        if (res && res.msg ) {
          this.itemAPIs.removeAllItem();
          this.router.navigate(["/order"])
        } else {
          //TODO: Error handle
        };
      })
    })


  }
}

