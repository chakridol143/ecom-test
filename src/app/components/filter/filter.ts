import { CommonModule, NgIf } from '@angular/common';
import { Component , EventEmitter, OnInit, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../category/services/category.services';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../product-list/services/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule , NgIf, FormsModule, HttpClientModule],
  templateUrl: './filter.html',
  styleUrls: ['./filter.css'],
  providers: [CategoryService, ProductService]
})
export class Filter {
  isFilterOpen = false;

  minPriceLimit = 2000;
  maxPriceLimit = 100000;

    categories: any[] = []; // <-- store categories here
  loading = true;
  errorMessage = '';

  products: any[] = [];

  @Output() productSelected = new EventEmitter<any>();
  
   constructor(private categoryService: CategoryService , private productService: ProductService , private router: Router) {}


  filters = {
  price: 20000,
  discount: 10,
  category: '',
  material: '',
  carat: '',
  type: '',
  occasion: ''
};


  openFilter() {
    this.isFilterOpen = true;
  }

  
  closeFilter() {
    this.isFilterOpen = false;
  }

  // applyFilters() {
  //   console.log('Applied Filters:', this.filters);
  //   this.closeFilter();
  // }

//   applyFilters() {
//   this.router.navigate(['/filter-results'], {
//     queryParams: {
//       product: this.filters.material   // selected product
//     }
//   });
// }

// applyFilters() {
//   const foundProduct = this.products.find(
//     p => p.name === this.filters.material
//   );

//   if (foundProduct) {
//     this.productSelected.emit(foundProduct);
//   }

//   this.closeFilter();
// }


applyFilters() {
  const foundProduct = this.products.find(
    p => p.name === this.filters.material
  );

  if (foundProduct) {
    this.router.navigate(['/filter-results'], {
      queryParams: {
        product: foundProduct.name
      }
    });
  } else {
    console.log("No matching product found");
  }

  this.closeFilter();
}

  updatePrice() {
    console.log('Current Price:', this.filters.price);
  }

  updateDiscount() {
    console.log('Current Discount:', this.filters.discount);
  }



  resetFilters() {
    this.filters = {
      price: 20000,
      discount: 10,
      // brand: '',
      category:'',
      material: '',
      carat: '',
      type: '',
      occasion: ''
    };
  }


  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = Array.isArray(data) ? data : [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
        this.errorMessage = 'Failed to load categories.';
        this.loading = false;
      }
    });
  }
  onCategoryChange() {
    if (!this.filters.category) {
      this.products = [];
      return;
    }

    const categoryId = Number(this.filters.category);

     this.productService.getProductsByCategory(categoryId)
      .subscribe({
        next: (res) => {
          this.products = res || [];
          console.log("Loaded Products:", this.products);
        },
        error: (err) => console.error("Product load error:", err)
      });
  }
}

