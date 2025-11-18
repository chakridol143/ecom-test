import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ProductList } from '../product-list/product-list';
import { Cart } from '../cart/cart';
import { SearchBusService } from '../search/services/search-bus.service'; // if search lives in header
 import { CategoryComponent } from '../category/category';
import { Slider } from '../slider/slider';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ProductList, Cart,Slider],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class Menu implements OnInit, OnDestroy {
  // selectedCategory : string = '';
  categories: any[] = [];
  selectedCategory: any = null;
  selectedCategoryId: number | null = null;
  searchTerm = '';
  @Input() cartCount = 0;
  @Input() cartItems: any[] = [];
  private baseUrl = 'https://ecom-backend-production-5341.up.railway.app/api/categories/with-products/all';
  private sub?: Subscription;
  constructor(private http: HttpClient, private searchBus: SearchBusService) { }
  ngOnInit() {
    this.http.get<any[]>(this.baseUrl).subscribe({
      next: (data) => { this.categories = this.dedupeCategories(data || []); },
      error: (err) => { console.error('Error loading categories:', err); },
    });
    // Listen to header search (optional; keep only if you use SearchBus)
    this.sub = this.searchBus.term$.subscribe(t => {
      this.searchTerm = t ?? '';
    });
  }
  ngOnDestroy() { this.sub?.unsubscribe(); }
  // NO TOGGLE: ignore repeat click on same category
  selectCategory(category: any) {
    if (!category) return;
    const id = Number(category?.category_id ?? category?.id);
    if (Number.isFinite(this.selectedCategoryId) && this.selectedCategoryId === id) {
      return; // do nothing on second click
    }
    this.selectedCategory = category;
    this.selectedCategoryId = Number.isFinite(id) ? id : null;
  }
  // If CategoryComponent emits only an id:
  onCategorySelected(id: number | null) {
    if (this.selectedCategoryId === id) return;
    this.selectedCategoryId = id;
    this.selectedCategory = id == null
      ? null
      : this.categories.find(c => Number(c?.category_id) === Number(id)) ?? null;
  }
  // helpers
  getImageUrl(img?: string): string {
    const raw = (img ?? '').replace(/^\/*/, '').trim();
    const encoded = encodeURIComponent(raw);
    return `https://ecom-backend-production-5341.up.railway.app/assets/images/${encoded}`;
  }
  onImageError(ev: Event) { (ev.target as HTMLImageElement).src = 'https://ecom-backend-production-5341.up.railway.app/assets/images/placeholder.png'; }
  trackByCategoryId(index: number, item: any) { return item?.category_id ?? index; }
  private dedupeCategories(arr: any[]): any[] {
    const map = new Map<number, any>();
    (arr || []).forEach((c: any) => {
      const id = Number(c?.category_id);
      if (!Number.isFinite(id)) return;
      if (!map.has(id)) {
        map.set(id, { ...c, products: Array.isArray(c.products) ? c.products : [] });
      } else {
        const existing = map.get(id);
        const combined = (existing.products || []).concat(c.products || []);
        const prodMap = new Map();
        combined.forEach((p: any) => { if (p && p.product_id) prodMap.set(p.product_id, p); });
        existing.products = Array.from(prodMap.values());
        map.set(id, existing);
      }
    });
    return Array.from(map.values());
  }
  handleAddToCart(item: any) {
    this.cartItems.push(item);
    this.cartCount = this.cartItems.length;
  }
}



// import { CommonModule } from '@angular/common';
// import { Component, Input, OnDestroy, OnInit } from '@angular/core';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { Subscription } from 'rxjs';
// import { ProductList } from '../product-list/product-list';
// import { Cart } from '../cart/cart';
// import { SearchBusService } from '../search/services/search-bus.service';
// import { Slider } from '../slider/slider';


// @Component({
//   selector: 'app-menu',
//   standalone: true,
//   imports: [CommonModule, HttpClientModule, ProductList, Cart, Slider],
//   templateUrl: './menu.html',
//   styleUrls: ['./menu.css']
// })
// export class Menu implements OnInit, OnDestroy {
  
//   categories: any[] = [];
//   selectedCategoryId: number | null = null;
//   selectedCategory: any = null;

//   searchTerm = '';
//   @Input() cartCount = 0;
//   @Input() cartItems: any[] = [];

//   private baseUrl = 'http://localhost:3000/api/categories/with-products/all';
//   private sub?: Subscription;

//   constructor(private http: HttpClient, private searchBus: SearchBusService) {}

//   ngOnInit() {
//     this.http.get<any[]>(this.baseUrl).subscribe({
//       next: (data) => { this.categories = this.dedupeCategories(data || []); },
//       error: (err) => { console.error('Error loading categories:', err); },
//     });

//     this.sub = this.searchBus.term$.subscribe(t => {
//       this.searchTerm = t ?? '';
//     });
//   }

//   ngOnDestroy() { this.sub?.unsubscribe(); }

//   /** ------------------------------------------
//    * CATEGORY SELECTION
//    * -----------------------------------------*/
//   selectCategory(category: any) {
//     const id = Number(category?.category_id);
//     if (this.selectedCategoryId === id) return;

//     this.selectedCategoryId = id;
//     this.selectedCategory = category;

//     // highlight clicked category
//     this.highlightCategory(id);
//   }

//   onCategorySelected(id: number | null) {
//     if (this.selectedCategoryId === id) return;

//     this.selectedCategoryId = id;
//     this.selectedCategory = id == null
//       ? null
//       : this.categories.find(c => Number(c.category_id) === id) ?? null;

//     this.highlightCategory(id);
//   }

//   highlightCategory(id: number | null) {
//     this.categories = this.categories.map(c => ({
//       ...c,
//       selected: c.category_id === id
//     }));
//   }

//   /** ------------------------------------------
//    * SLIDER → CATEGORY MAPPING
//    * -----------------------------------------*/

//   images = [
//     '../../../assets/images/banner-bangle.webp',
//     '../../../assets/images/banner-oddiyaanam_3.webp',
//     '../../../assets/images/banner-ring.webp',
//     '../../../assets/images/banner-pendant.webp',
//     '../../../assets/images/earrings_1.jpg'
//   ];

//   sliderMap: { [key: string]: number } = {
//     '../../../assets/images/banner-bangle.webp': 1,     // Bangle category
//     '../../../assets/images/banner-oddiyaanam_3.webp': 8,
//     '../../../assets/images/banner-ring.webp': 7,
//     '../../../assets/images/banner-pendant.webp': 5,
//     '../../../assets/images/earrings_1.jpg': 2
//   };

//   currentIndex = 0;

//   nextSlide() {
//     this.currentIndex = (this.currentIndex + 1) % this.images.length;
//   }

//   prevSlide() {
//     this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
//   }

//   /** When slider image is clicked */
//   onSliderClick(img: string) {
//     const categoryId = this.sliderMap[img];

//     if (categoryId) {
//       this.selectedCategoryId = categoryId;
//       this.selectedCategory = this.categories.find(c => c.category_id === categoryId) ?? null;

//       this.highlightCategory(categoryId);
//     }
//   }

//   /** ------------------------------------------
//    * IMAGE HELPERS
//    * -----------------------------------------*/
//   getImageUrl(img?: string): string {
//     const raw = (img ?? '').replace(/^\/*/, '').trim();
//     const encoded = encodeURIComponent(raw);
//     return `http://localhost:3000/assets/images/${encoded}`;
//   }

//   onImageError(ev: Event) {
//     (ev.target as HTMLImageElement).src = 'http://localhost:3000/assets/images/placeholder.png';
//   }

//   trackByCategoryId(index: number, item: any) { return item?.category_id ?? index; }

//   /** ------------------------------------------
//    * CATEGORY DEDUPE
//    * -----------------------------------------*/
//   private dedupeCategories(arr: any[]): any[] {
//     const map = new Map<number, any>();
//     (arr || []).forEach((c: any) => {
//       const id = Number(c?.category_id);
//       if (!Number.isFinite(id)) return;

//       if (!map.has(id)) {
//         map.set(id, { ...c, products: Array.isArray(c.products) ? c.products : [] });
//       } else {
//         const existing = map.get(id);
//         const combined = (existing.products || []).concat(c.products || []);
//         const prodMap = new Map();
//         combined.forEach((p: any) => { if (p && p.product_id) prodMap.set(p.product_id, p); });
//         existing.products = Array.from(prodMap.values());
//         map.set(id, existing);
//       }
//     });
//     return Array.from(map.values());
//   }

//   /** ------------------------------------------
//    * ADD TO CART
//    * -----------------------------------------*/
//   handleAddToCart(item: any) {
//     this.cartItems.push(item);
//     this.cartCount = this.cartItems.length;
//   }
// }
