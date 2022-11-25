import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  item: any;
  itemId: any;

  constructor(private itemAPIs: ItemService, private router: ActivatedRoute) {
    this.itemId = this.router.snapshot.params['id'];
  }

  ngOnInit(): void {

    this.itemAPIs.getItemByID(this.itemId).subscribe((item) => {
      this.item = item;
    });
  }
}
