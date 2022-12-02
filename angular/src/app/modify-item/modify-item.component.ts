import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../services/item.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-modify-item',
  templateUrl: './modify-item.component.html',
  styleUrls: ['./modify-item.component.scss']
})
export class ModifyItemComponent implements OnInit {
  title: string = "Create Item";
  itemId: any;
  item = {
    name: "",
    type: "",
    price: 0,
    remain: 0,
    description: "",
    shop: "",
  }

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
    }
  }
  onSubmit() {
    let funFunction;
    
    if (this.itemId) {
      funFunction = this.itemAPIs.updateItemByID(this.itemId, this.item)
    } else {
      funFunction = this.itemAPIs.createItem(this.item)
    }

    funFunction.subscribe((res) => {
      console.log(res)
      if(res && res.item && res.item){
        this.router.navigate(["/product"])
      }else{
        //TODO: Error handle
      }
      
    });
  }
  getItem() {
    this.itemAPIs.getItemByID(this.itemId).subscribe((item) => {
      this.item = item;
    });
  }

  deleteItem(){
    this.itemAPIs.deleteItem(this.itemId).subscribe((res) => {
      console.log(res)
      if(res && res.item && res.item){
        this.router.navigate(["/product"])
      }else{
        //TODO: Error handle
      }
    });
  }
}
