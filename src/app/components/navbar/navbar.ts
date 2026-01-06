import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category, CategoryService } from '../category/services/category.services';
import { ProductService } from '../product-list/services/product.service';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  categories: Category[] = [];
  loading = true;
  error = '';
  isAllMenuOpen = false;
  activeDropdown: number | null = null;

  @Output() categorySelected = new EventEmitter<number | null>();
  @Output() womenCollectionClick = new EventEmitter<void>();
  @Output() newReleasesClick = new EventEmitter<void>();
  @Output() bestSellersClick = new EventEmitter<void>();
  @Output() mensCollectionClick = new EventEmitter<void>();
  constructor(private categoryService: CategoryService,  private productService: ProductService, private router: Router ) {}

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
  if (this.isAllMenuOpen) {
    this.activeDropdown = null;
  }
}
products: any[] = [];

loadProducts(catId: number) {
  this.productService.getProductsByCategory(catId).subscribe((res: any[]) => {
    console.log("Products:", res);
    this.products = res;
    

  });
}

onImageError(event: any) {
  event.target.src = 'assets/images/placeholder.png';
}



selectWomenCollection() {
  this.isAllMenuOpen = false;
  this.womenCollectionClick.emit();
}

onNewReleasesClick() {
  this.newReleasesClick.emit();
}


openBestSellers() {
  this.bestSellersClick.emit();
}

selectMensCollection() {
  this.isAllMenuOpen = false;
  this.mensCollectionClick.emit();
}
}