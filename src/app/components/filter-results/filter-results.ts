import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product-list/services/product.service';

@Component({
  selector: 'app-filter-results',
  imports: [NgIf],
  templateUrl: './filter-results.html',
  styleUrl: './filter-results.css'
})
export class FilterResults {

    productName = '';
  product: any = null;

   constructor(
    private route: ActivatedRoute,
    private productService:ProductService 
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.productName = params['product'];
      this.loadProduct();
    });
  }

  loadProduct() {
  this.productService.getAll().subscribe((res: any) => {
    console.log("All Products:", res);

    const list = Array.isArray(res) ? res : [];

    this.product = list.find(
      (item) => item.name === this.productName   
    );

    console.log("Matched product:", this.product);
  });
}

onImageError(event: any) {
    event.target.src = 'assets/images/placeholder.png';
  }

}
