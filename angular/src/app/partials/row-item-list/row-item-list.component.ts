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
  @Input() itemUri: string = "";
  @Output() newItemEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }


  clickbutton(item: any) {
    this.newItemEvent.emit(item);
  }

  clickItem(item: any) {
    this.newItemEvent.emit(item);
  }
}
