import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from '../services/item.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-modify-item',
  templateUrl: './modify-item.component.html',
  styleUrls: ['./modify-item.component.scss']
})
export class ModifyItemComponent implements OnInit {
  title: string = "Create Item";
  showErrorMsg: boolean = false;
  errorMsg: string = "";

  itemId: any;
  item = {
    name: "",
    type: "",
    price: 0,
    remain: 0,
    description: "",
    shop: "",
  };
  buttonText: string = "Submit";

  constructor(private authAPIs: AuthService, private itemAPIs: ItemService, private router: Router, private routerLink: ActivatedRoute) {
    this.itemId = this.routerLink.snapshot.params['id'];
    if (this.itemId) {
      this.getItem();
    }
    this.authAPIs.checkToken();
    this.item.shop = this.authAPIs.getUserID();
  }

  ngOnInit(): void {
    if (this.itemId) {
      this.title = "Update Item"
      this.buttonText = "Update"
    }
  }
  onSubmit() {
    this.showError();

    if (
      this.item.name &&
      this.item.type &&
      this.item.price &&
      this.item.remain>=0 &&
      this.item.description &&
      this.item.shop
    ) {
      let funFunction;

      if (this.itemId) {
        funFunction = this.itemAPIs.updateItemByID(this.itemId, this.item)
      } else {
        funFunction = this.itemAPIs.createItem(this.item)
      }

      funFunction.subscribe({
        next: res => {
          if (res && res.item && res.item) {
            this.router.navigate(["/product"])
          } else {
            this.showError();
          }
        },
        error: err => {
          this.errorMsg = err.errMsg;
          this.showError();
        },
        complete: () => console.log('done')

      });
    } else {
      this.showError();
    }
  }
  getItem() {
    this.itemAPIs.getItemByID(this.itemId).subscribe({
      next: item => {
        if (item) {
          this.item = item;       
         } else {
          this.showError();
        }
      },
      error: err => {
        this.errorMsg = err.errMsg;
        this.showError();
      },
      complete: () => console.log('done')
    });
  }

  deleteItem() {
    this.itemAPIs.deleteItem(this.itemId).subscribe({
      next: res => {
        if (res && res.item && res.item) {
          this.router.navigate(["/product"])
        } else {
          //TODO: Error handle
        }
      },
      error: err => {
        this.errorMsg = err.errMsg;
        this.showError();
      },
      complete: () =>  this.router.navigate(["/product"])
    });
  }

  showError() {
    this.showErrorMsg = true;
  }
}
