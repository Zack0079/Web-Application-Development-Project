import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemService } from '../services/item.service';


@Component({
  selector: 'app-itemslist',
  templateUrl: './itemslist.component.html',
  styleUrls: ['./itemslist.component.scss']
})
export class ItemslistComponent implements OnInit {
  
  itemList:any;

  constructor(private itemAPIs:ItemService) { }

  ngOnInit(): void {
    
    this.itemAPIs.getItemList().subscribe((itemList)=>{
      this.itemList = itemList;
    });
  }

}
