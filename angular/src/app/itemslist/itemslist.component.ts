import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemService } from '../services/item.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-itemslist',
  templateUrl: './itemslist.component.html',
  styleUrls: ['./itemslist.component.scss']
})
export class ItemslistComponent implements OnInit {
  
  itemList:any;

  constructor(private authAPIs: AuthService, private itemAPIs: ItemService) {}
  ngOnInit(): void {
    
    this.itemAPIs.getItemList().subscribe((itemList)=>{
      this.itemList = itemList;
    });
  }

  addSelectedItemInCart(selectedItem:any):void{
    // console.log("addSelectedItemInCart");
    this.itemAPIs.addItemInCart(selectedItem);
  }

  addSelectedItemInWishList(selectedItem:any):void{
    this.authAPIs.checkToken();
    let id =this.authAPIs.getUserID();
    this.itemAPIs.addItemsInWishList(selectedItem,id).subscribe((res) => {
      console.log(res)
    });
  }
}
