import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-row-item-list',
  templateUrl: './row-item-list.component.html',
  styleUrls: ['./row-item-list.component.scss']
})
export class RowItemListComponent implements OnInit {
  @Input() items: any;

  @Input() showButton1: any;
  @Input() Button1Text: any;

  @Input() showButton2: any;
  @Input() Button2Text: any;

  @Input() showQuantify: any;
  @Input() disableQuantify: boolean = false;

  @Input() itemUri: string = "";
  @Output() clickButton1Event = new EventEmitter<string>();
  @Output() clickButton2Event = new EventEmitter<string>();
  @Output() clickItemEvent = new EventEmitter<string>();
  @Output() updateQuantifyEvent = new EventEmitter<string>();

  numbers: Array<number> = [];

  constructor() { 
    new Array(10).fill(0).map((x,i)=>{
      this.numbers.push(i+1);
    })
  }
  

  ngOnInit(): void {
  }

  clickbutton1(item: any) {
    this.clickButton1Event.emit(item);
  }

  clickbutton2(item: any) {
    this.clickButton2Event.emit(item);
  }

  clickItem(item: any) {
    this.clickItemEvent.emit(item);
  }

  updateQuantify(item: any){
    this.updateQuantifyEvent.emit(item);
  }
}
