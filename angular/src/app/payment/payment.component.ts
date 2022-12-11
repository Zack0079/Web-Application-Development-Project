import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ItemService } from '../services/item.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
const { v4: uuidv4 } = require('uuid');

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})

export class PaymentComponent implements OnInit {
  title: string = "Payment";
  id: any;
  data = {
    address: "",
    recipient: "",
    cardHolder: "",

    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  };
  total_price: number = 0;

  itemInCart: Array<any> = [];
  selectedArray: Array<any> = [];

  saveAsDefault: boolean = false;
  showErrorMsg: boolean = false;
  errorMsg: string = "";

  constructor(private itemAPIs: ItemService, private authAPIs: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authAPIs.checkToken();

    this.itemInCart = this.itemAPIs.getItemsInCart();

    new Promise((resolve, reject) => {
      this.itemInCart.forEach((item, index, array) => {
        return this.itemAPIs.getItemByID(item._id, true).subscribe((res) => {
          this.itemInCart[index].price = res
          this.total_price += res * this.itemInCart[index].quantify;
          this.selectedArray.push(true)
          if (index === array.length - 1) { 
            this.total_price = Number(this.total_price.toFixed(2));
            resolve("") 
          }
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
          this.data.address = result.address ? result.address : "";
          this.data.recipient = result.recipient ? result.recipient : "";
        }
        return;
      });
    });
  }

  onSubmit() {
    this.showErrorMsg = true;

    if (this.saveAsDefault) {
      let obj = {
        "address": this.data.address,
        "recipient": this.data.recipient
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
    if (
      this.data.address &&
      this.data.recipient &&
      this.data.cardHolder &&
      this.data.cardNumber &&
      this.data.cardExpiry &&
      this.data.cardCvc &&
      this.total_price > 0
    ) {
      new Promise((resolve, reject) => {
        this.selectedArray.forEach((value, index, array) => {
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
          if (res && res.msg) {
            return;
          } else {
            this.showError();
            throw this.errorMsg;
          };
        })
      }).then((res) => {
        return new Promise((resolve, reject) => {
          this.selectedArray.forEach((value, index, array) => {
            if (value) {
              let item = this.itemInCart[index];
              this.itemAPIs.removeItem(item._id);

              this.itemAPIs.updateItemRemain(item._id, item.quantify).subscribe((res) => {
                if (res && res.msg) {
                  return;
                } else {
                  this.showError();
                  throw this.errorMsg;
                };
              })
            }
            if (index === array.length - 1) { resolve("") }
          });
        });
      }).then(() => {

        this.router.navigate(["/order"])
        return;
      }).catch(err => console.log(err))
    } else {
      console.log(this.data)
      this.showError();
    }

  }

  showError() {
    this.showErrorMsg = true;
  }

  updateTotalPrice() {
    new Promise(resolve => setTimeout(resolve, 100)).then(() => {
      this.total_price = 0
      console.log(this.selectedArray)
      this.selectedArray.forEach((value, index, array) => {
        console.log(value)

        if (value) {
          this.total_price += this.itemInCart[index].price
        }
      });
      console.log(this.total_price)
    });

  }

}


