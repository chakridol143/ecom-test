// // import { CommonModule } from '@angular/common';
// // import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// // import { Category, CategoryService } from '../category/services/category.services';
// // import { ProductService } from '../product-list/services/product.service';
 

// // @Component({
// //   selector: 'app-navbar',
// //   standalone: true,
// //   imports: [CommonModule],
// //   templateUrl: './navbar.html',
// //   styleUrl: './navbar.css'
// // })
// // export class Navbar implements OnInit {
// // this is category data
// //   categories: Category[] = [];
// //   loading = true;
// //   error = '';
// //  productsMap: { [key: number]: any[] } = {};

// //   @Output() categorySelected = new EventEmitter<number | null>();

// //   constructor(private categoryService: CategoryService,  private productService: ProductService ) {}

// //   ngOnInit() {
// //     this.categoryService.getAllCategories().subscribe({
// //       next: (data) => {
// //         this.categories = data || [];
// //         this.loading = false;
// //       },
// //       error: (err) => {
// //         console.error('Failed to load categories:', err);
// //         this.error = 'Error loading categories';
// //         this.loading = false;
// //       }
// //     });
// //   }

// //   selectCategory(id: number | null) {
// //     this.categorySelected.emit(id);
// //   }

// //   trackByCategoryId(index: number, item: any): number {
// //   return item.category_id;
// // } 


// // activeDropdown: number | null = null;

// // toggleDropdown(catId: number) {
// //   this.activeDropdown = this.activeDropdown === catId ? null : catId;

// //   if (this.activeDropdown && !this.products[catId]) {
// //     this.loadProducts(catId);
// //   }
// // }

// // products: any[] = [];
// // loadProducts(catId: number) {
// //   this.categoryService.getCategoriesWithProducts().subscribe((res: any[]) => {
// //     this.products[catId] = res;
// //     console.log("Products for category", catId, res);
// //   });
// // }

// // }

// import { CommonModule } from '@angular/common';
// import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { Category, CategoryService } from '../category/services/category.services';
// import { ProductService } from '../product-list/services/product.service';
 

// @Component({
//   selector: 'app-navbar',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './navbar.html',
//   styleUrl: './navbar.css'
// })
// export class Navbar implements OnInit {
// //this is category data
//   categories: Category[] = [];
//   loading = true;
//   error = '';

//   @Output() categorySelected = new EventEmitter<number | null>();

//   constructor(private categoryService: CategoryService,  private productService: ProductService ) {}

//   ngOnInit() {
//     this.categoryService.getAllCategories().subscribe({
//       next: (data) => {
//         this.categories = data || [];
//         this.loading = false;
//       },
//       error: (err) => {
//         console.error('Failed to load categories:', err);
//         this.error = 'Error loading categories';
//         this.loading = false;
//       }
//     });
//   }

//   selectCategory(id: number | null) {
//     this.categorySelected.emit(id);
//   }

//   trackByCategoryId(index: number, item: any): number {
//   return item.category_id;
// } 


// activeDropdown: number | null = null;

// toggleDropdown(catId: number) {
//   this.activeDropdown = this.activeDropdown === catId ? null : catId;

//   if (this.activeDropdown) {
//     this.loadProducts(catId);
//   }
// }

// products: any[] = [];

// loadProducts(catId: number) {
//   this.productService.getProductsByCategory(catId).subscribe((res: any[]) => {
//     console.log("Products:", res);
//     this.products = res;
    

//   });
// }
// }

// import { CommonModule } from '@angular/common';
// import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { Category, CategoryService } from '../category/services/category.services';
// import { ProductService } from '../product-list/services/product.service';
 

// @Component({
//   selector: 'app-navbar',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './navbar.html',
//   styleUrl: './navbar.css'
// })
// export class Navbar implements OnInit {
// this is category data
//   categories: Category[] = [];
//   loading = true;
//   error = '';
//  productsMap: { [key: number]: any[] } = {};

//   @Output() categorySelected = new EventEmitter<number | null>();

//   constructor(private categoryService: CategoryService,  private productService: ProductService ) {}

//   ngOnInit() {
//     this.categoryService.getAllCategories().subscribe({
//       next: (data) => {
//         this.categories = data || [];
//         this.loading = false;
//       },
//       error: (err) => {
//         console.error('Failed to load categories:', err);
//         this.error = 'Error loading categories';
//         this.loading = false;
//       }
//     });
//   }

//   selectCategory(id: number | null) {
//     this.categorySelected.emit(id);
//   }

//   trackByCategoryId(index: number, item: any): number {
//   return item.category_id;
// } 


// activeDropdown: number | null = null;

// toggleDropdown(catId: number) {
//   this.activeDropdown = this.activeDropdown === catId ? null : catId;

//   if (this.activeDropdown && !this.products[catId]) {
//     this.loadProducts(catId);
//   }
// }

// products: any[] = [];
// loadProducts(catId: number) {
//   this.categoryService.getCategoriesWithProducts().subscribe((res: any[]) => {
//     this.products[catId] = res;
//     console.log("Products for category", catId, res);
//   });
// }

// }

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category, CategoryService } from '../category/services/category.services';
import { ProductService } from '../product-list/services/product.service';
 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
//this is category data
  categories: Category[] = [];
  loading = true;
  error = '';
  isAllMenuOpen = false;
  activeDropdown: number | null = null;

  @Output() categorySelected = new EventEmitter<number | null>();

  constructor(private categoryService: CategoryService,  private productService: ProductService ) {}

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load categories:', err);
        this.error = 'Error loading categories';
        this.loading = false;
      }
    });
  }

  selectCategory(id: number | null) {
    this.categorySelected.emit(id);
  }

  trackByCategoryId(index: number, item: any): number {
  return item.category_id;
} 

toggleAllMenu() {
  this.isAllMenuOpen = !this.isAllMenuOpen;

  // Close category dropdown if All is opened
  if (this.isAllMenuOpen) {
    this.activeDropdown = null;
  }
}




toggleDropdown(catId: number) {
  this.activeDropdown = this.activeDropdown === catId ? null : catId;

  if (this.activeDropdown) {
    this.loadProducts(catId);
  }
}

products: any[] = [];

loadProducts(catId: number) {
  this.productService.getProductsByCategory(catId).subscribe((res: any[]) => {
    console.log("Products:", res);
    this.products = res;
    

  });
}
}