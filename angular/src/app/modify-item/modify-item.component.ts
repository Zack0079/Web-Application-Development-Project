import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../services/item.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modify-item',
  templateUrl: './modify-item.component.html',
  styleUrls: ['./modify-item.component.scss']
})
export class ModifyItemComponent implements OnInit {
  title:string = "Create Item";
  itemId: any;
  item = {
    name: "",
    type: "",
    price:0,
    remain:0,
    description:""
  }

  constructor(private itemAPIs:ItemService, private router: Router, private routerLink: ActivatedRoute) { 
    this.itemId = this.routerLink.snapshot.params['id'];
    this.getItem();
  }

  ngOnInit(): void {
    if(this.itemId){
      this.title = "Update Item"
    }
  }
  onSubmit() {
    this.itemAPIs.createItem(this.item).subscribe((res) => {
      this.router.navigate(["/items"])
    });
  }
  getItem() {
    this.itemAPIs.getItemByID(this.itemId).subscribe((item) => {
      this.item = item;
    });
  }
}
