import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product'
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  public products: Product[];
  constructor(private utils: UtilitiesService) { }

  ngOnInit() {
    this.mapProducts();
  }
  mapProducts() {
    this.utils.getProducts().subscribe(data => {
      this.products = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Product;
      })
    })
  }
}
