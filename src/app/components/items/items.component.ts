import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  items: Item[];
  constructor(
    private itemService: ItemService,
    public AuthenticationService: AuthService
  ) { }

  ngOnInit() {
    this.itemService.getItems().subscribe(items => this.items = items);
  }
}


