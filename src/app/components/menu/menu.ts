// import { CommonModule, Location } from '@angular/common';
// import { Component, Input, OnDestroy, OnInit } from '@angular/core';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { Subscription } from 'rxjs';
// import { ProductList } from '../product-list/product-list';
// import { Cart } from '../cart/cart';
// import { SearchBusService } from '../search/services/search-bus.service'; 
// import { Slider } from '../slider/slider';
// import { Router } from '@angular/router';
// import { ProductSelectionService } from '../filter/filter-results.services';
// import { WomensCollections } from '../womens-collections/womens-collections';
// import { Releases } from '../releases/releases';
// import { Bestsellers } from '../bestsellers/bestsellers';
// import { MensCollections } from '../mens-collections/mens-collections';
// import { ViewStateService } from '../services/view-state.service';
// import { Productdetails } from '../productdetails/productdetails';

// @Component({
//   selector: 'app-menu',
//   standalone: true,
//   imports: [
//     CommonModule,
//     HttpClientModule,
//     Cart,
//     Slider,
//     WomensCollections,
//     Releases,
//     Bestsellers,
//     MensCollections,
//     ProductList,
//     Productdetails
//   ],
//   templateUrl: './menu.html',
//   styleUrls: ['./menu.css']
// })
// export class Menu implements OnInit, OnDestroy {

//   categories: any[] = [];
//   selectedCategory: any = null;
//   selectedCategoryId: number | null = null;
//   searchTerm = '';
//   @Input() cartCount = 0;
//   @Input() cartItems: any[] = [];

//   // view state flags (used in template)
//   showWomensCollection = false;
//   showReleases = false;
//   showBestsellers = false;
//   showMensCollection = false;

//   selectedProduct: any = null;

//   private baseUrl = 'https://ecom-backend-production-5341.up.railway.app/api/categories/with-products/all';
//   private subs = new Subscription();

//   constructor(
//     private http: HttpClient,
//     private searchBus: SearchBusService,
//     private productSelection: ProductSelectionService,
//     private router: Router,
//     private location: Location,
//     private viewState: ViewStateService
//   ) {}

//   ngOnInit() {
//     // load categories
//     this.http.get<any[]>(this.baseUrl).subscribe({
//       next: (data) => { this.categories = this.dedupeCategories(data || []); },
//       error: (err) => { console.error('Error loading categories:', err); },
//     });

//     // subscribe search term
//     this.subs.add(
//       this.searchBus.term$.subscribe(t => {
//         this.searchTerm = t ?? '';
//       })
//     );

//     // subscribe view state (from Header / Navbar etc.)
//     this.subs.add(
//       this.viewState.state$.subscribe(state => {
//         this.showWomensCollection = state.showWomensCollection;
//         this.showReleases = state.showReleases;
//         this.showBestsellers = state.showBestsellers;
//         this.showMensCollection = state.showMensCollection;
//         this.selectedProduct = state.selectedProduct;
//       })
//     );

//     // subscribe product selection from Filter
//     this.subs.add(
//       this.productSelection.selectedProduct$.subscribe(product => {
//         if (product) {
//           this.viewState.setSelectedProduct(product);
//         }
//       })
//     );
//   }

//   ngOnDestroy() {
//     this.subs.unsubscribe();
//   }

//   // CATEGORY LOGIC
//   selectCategory(category: any) {
//     if (!category) return;
//     const id = Number(category?.category_id ?? category?.id);
//     if (Number.isFinite(this.selectedCategoryId) && this.selectedCategoryId === id) return;

//     this.selectedCategory = category;
//     this.selectedCategoryId = Number.isFinite(id) ? id : null;
//   }
  
//   onCategorySelected(id: number | null) {
//     if (this.selectedCategoryId === id) return;
//     this.selectedCategoryId = id;
//     this.selectedCategory = id == null
//       ? null
//       : this.categories.find(c => Number(c?.category_id) === Number(id)) ?? null;
//   }

//   // IMAGE LOGIC
//   getImageUrl(img?: string): string {
//     const raw = (img ?? '').replace(/^\/*/, '').trim();
//     const encoded = encodeURIComponent(raw);
//     return `https://ecom-backend-production-5341.up.railway.app/assets/images/${encoded}`;
//   }

//   onImageError(ev: Event) { 
//     (ev.target as HTMLImageElement).src = 
//       'https://ecom-backend-production-5341.up.railway.app/assets/images/placeholder.png'; 
//   }

//   trackByCategoryId(index: number, item: any) { 
//     return item?.category_id ?? index; 
//   }

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
//         combined.forEach((p: any) => { 
//           if (p && p.product_id) prodMap.set(p.product_id, p); 
//         });
//         existing.products = Array.from(prodMap.values());
//         map.set(id, existing);
//       }
//     });
//     return Array.from(map.values());
//   }

//   // CART LOGIC
//   handleAddToCart(item: any) {
//     this.cartItems.push(item);
//     this.cartCount = this.cartItems.length;
//   }

//   loadProductDetails(id: number) {
//     const allProducts = this.categories.flatMap(c => c.products || []);
//     const product = allProducts.find(p => p.product_id == id);
//     if (product) {
//       this.viewState.setSelectedProduct(product);
//     }
//   }

//   closeProductView() {
//     this.viewState.clearSelectedProduct();
//   }

//   // close handlers from collection components
//   closeWomensCollection() {
//     this.viewState.clearCollections();
//   }

//   closeReleases() {
//     this.viewState.clearCollections();
//   }

//   closeBestsellers() {
//     this.viewState.clearCollections();
//   }

//   closeMensCollections() {
//     this.viewState.clearCollections();
//   }
// }
// import { CommonModule } from '@angular/common';
// import { Component, Input, OnDestroy, OnInit } from '@angular/core';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { Subscription, filter } from 'rxjs';
// import { Router, NavigationEnd } from '@angular/router';

// import { Cart } from '../cart/cart';
// import { Slider } from '../slider/slider';
// import { ProductList } from '../product-list/product-list';
// import { WomensCollections } from '../womens-collections/womens-collections';
// import { Releases } from '../releases/releases';
// import { Bestsellers } from '../bestsellers/bestsellers';
// import { MensCollections } from '../mens-collections/mens-collections';

// import { SearchBusService } from '../search/services/search-bus.service';
// import { ProductSelectionService } from '../filter/filter-results.services';
// import { ViewStateService } from '../services/view-state.service';

// @Component({
//   selector: 'app-menu',
//   standalone: true,
//   imports: [
//     CommonModule,
//     HttpClientModule,
//     Cart,
//     Slider,
//     WomensCollections,
//     Releases,
//     Bestsellers,
//     MensCollections,
//     ProductList,
 
//   ],
//   templateUrl: './menu.html',
//   styleUrls: ['./menu.css']
// })
// export class Menu implements OnInit, OnDestroy {

//   @Input() cartCount = 0;
//   @Input() cartItems: any[] = [];

//   categories: any[] = [];
//   selectedCategory: any = null;
//   selectedCategoryId: number | null = null;
//   searchTerm = '';


//   showWomensCollection = false;
//   showReleases = false;
//   showBestsellers = false;
//   showMensCollection = false;

//   selectedProduct: any = null;


//   currentRoute: string = '';

//   private baseUrl = 'https://ecom-backend-production-5341.up.railway.app/api/categories/with-products/all';
//   private subs = new Subscription();

//   constructor(
//     private http: HttpClient,
//     private searchBus: SearchBusService,
//     private productSelection: ProductSelectionService,
//     private router: Router,
//     private viewState: ViewStateService
//   ) {}

//   ngOnInit() {
//     // load categories
//     this.subs.add(
//       this.http.get<any[]>(this.baseUrl).subscribe({
//         next: (data) => { this.categories = this.dedupeCategories(data || []); },
//         error: (err) => { console.error('Error loading categories:', err); }
//       })
//     );

//     // subscribe search term
//     this.subs.add(
//       this.searchBus.term$.subscribe(t => {
//         this.searchTerm = t ?? '';
//       })
//     );

//     // subscribe view state
//     this.subs.add(
//       this.viewState.state$.subscribe(state => {
//         this.showWomensCollection = !!state?.showWomensCollection;
//         this.showReleases = !!state?.showReleases;
//         this.showBestsellers = !!state?.showBestsellers;
//         this.showMensCollection = !!state?.showMensCollection;
//         this.selectedProduct = state?.selectedProduct ?? null;
//       })
//     );

//     // subscribe product-selection from Filter
//     this.subs.add(
//       this.productSelection.selectedProduct$.subscribe(product => {
//         if (product) {
//           this.viewState.setSelectedProduct(product);
//         }
//       })
//     );

//     // watch route changes and set currentRoute (only NavigationEnd)
//     this.subs.add(
//       this.router.events
//         .pipe(filter(e => e instanceof NavigationEnd))
//         .subscribe((e: any) => {
//           this.currentRoute = (e?.urlAfterRedirects ?? e?.url ?? '').toString();
//         })
//     );

//     // set initial currentRoute (in case loaded directly)
//     this.currentRoute = this.router.url;
//   }

//   ngOnDestroy() {
//     this.subs.unsubscribe();
//   }

//   // CATEGORY LOGIC
//   selectCategory(category: any) {
//     if (!category) return;
//     const id = Number(category?.category_id ?? category?.id);
//     if (Number.isFinite(this.selectedCategoryId) && this.selectedCategoryId === id) return;

//     this.selectedCategory = category;
//     this.selectedCategoryId = Number.isFinite(id) ? id : null;
//   }

//   onCategorySelected(id: number | null) {
//     if (this.selectedCategoryId === id) return;
//     this.selectedCategoryId = id;
//     this.selectedCategory = id == null
//       ? null
//       : this.categories.find(c => Number(c?.category_id) === Number(id)) ?? null;
//   }

//   // IMAGE LOGIC
//   getImageUrl(img?: string): string {
//     const raw = (img ?? '').replace(/^\/*/, '').trim();
//     const encoded = encodeURIComponent(raw);
//     return `https://ecom-backend-production-5341.up.railway.app/assets/images/${encoded}`;
//   }

//   onImageError(ev: Event) {
//     (ev.target as HTMLImageElement).src =
//       'https://ecom-backend-production-5341.up.railway.app/assets/images/placeholder.png';
//   }

//   trackByCategoryId(index: number, item: any) {
//     return item?.category_id ?? index;
//   }

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
//         combined.forEach((p: any) => {
//           if (p && p.product_id) prodMap.set(p.product_id, p);
//         });
//         existing.products = Array.from(prodMap.values());
//         map.set(id, existing);
//       }
//     });
//     return Array.from(map.values());
//   }

//   // CART LOGIC
//   handleAddToCart(item: any) {
//     this.cartItems.push(item);
//     this.cartCount = this.cartItems.length;
//   }

//   // load product details into viewState (used by menu-level product viewer)
//   loadProductDetails(id: number) {
//     const allProducts = this.categories.flatMap(c => c.products || []);
//     const product = allProducts.find(p => p.product_id == id);
//     if (product) {
//       this.viewState.setSelectedProduct(product);
//       // navigate to details route to keep URL in sync (optional)
//       this.router.navigate(['/productdetails', product.product_id]);
//     } else {
//       // navigate anyway to productdetails and let ProductDetails component fetch by id
//       this.router.navigate(['/productdetails', id]);
//     }
//   }

//   closeProductView() {
//     this.viewState.clearSelectedProduct();
//   }

//   // close handlers from collection components
//   closeWomensCollection() { this.viewState.clearCollections(); }
//   closeReleases() { this.viewState.clearCollections(); }
//   closeBestsellers() { this.viewState.clearCollections(); }
//   closeMensCollections() { this.viewState.clearCollections(); }
// }
import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { SearchBusService } from '../search/services/search-bus.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSelectionService } from '../filter/filter-results.services';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,

  ],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class Menu implements OnInit, OnDestroy {

  categories: any[] = [];
  selectedCategory: any = null;
  selectedCategoryId: number | null = null;
  searchTerm = '';
  @Input() cartCount = 0;
  @Input() cartItems: any[] = [];
   activeIndex = 0;
  quantity = 1; 
  activeImage: string = '';
relatedProducts: any[] = [];
  

  private baseUrl = 'https://ecom-backend-production-5341.up.railway.app/api/categories/with-products/all';
  private sub?: Subscription;

  constructor(
    private http: HttpClient,
    private searchBus: SearchBusService,
   private productSelection: ProductSelectionService,
    private router: Router,
    private location: Location,
     private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.http.get<any[]>(this.baseUrl).subscribe({
      next: (data) => { this.categories = this.dedupeCategories(data || []); },
      error: (err) => { console.error('Error loading categories:', err); },
    });

    this.sub = this.searchBus.term$.subscribe(t => {
      this.searchTerm = t ?? '';
    });

  //   this.route.paramMap.subscribe(params => {
  //   const id = Number(params.get('id'));
  //   if (id) {
  //     this.loadProductDetails(id); // you already have this function
  //   }
  // });

     this.productSelection.selectedProduct$.subscribe(product => {
  if (product) {
    const base = 'https://ecom-backend-production-5341.up.railway.app/assets/images/';

    this.selectedProduct = product;

    // ---- MULTIPLE IMAGES FROM DATABASE ----
    this.selectedProduct.images = [
      product.image_url,
      product.image_url1,
      product.image_url2,
      product.image_url3,
      product.image_url4
    ]
    .filter(img => !!img)   // remove null
    .map(img => base + img);

    // default main image = first image
    this.activeIndex = 0;

    // ---- LOAD RELATED PRODUCTS (SAME CATEGORY) ----
    this.updateRelatedProducts(product);
  }
}); 
  }

setActive(i: number) {
    this.activeIndex = i;
  }

  closeProductView() {
    this.selectedProduct = null;
  }

  incQty() {
    this.quantity++;
  }

  decQty() {
    if (this.quantity > 1) this.quantity--;
  }

  

  ngOnDestroy() { this.sub?.unsubscribe(); }

  // CATEGORY LOGIC
  selectCategory(category: any) {
    if (!category) return;
    const id = Number(category?.category_id ?? category?.id);
    if (Number.isFinite(this.selectedCategoryId) && this.selectedCategoryId === id) return;

    this.selectedCategory = category;
    this.selectedCategoryId = Number.isFinite(id) ? id : null;
  }
  
  onCategorySelected(id: number | null) {
    if (this.selectedCategoryId === id) return;
    this.selectedCategoryId = id;
    this.selectedCategory = id == null
      ? null
      : this.categories.find(c => Number(c?.category_id) === Number(id)) ?? null;
  }

  // IMAGE LOGIC
  getImageUrl(img?: string): string {
    const raw = (img ?? '').replace(/^\/*/, '').trim();
    const encoded = encodeURIComponent(raw);
    return `https://ecom-backend-production-5341.up.railway.app/assets/images/${encoded}`;
  }
  onImageError(ev: Event) { 
    (ev.target as HTMLImageElement).src = 
      'https://ecom-backend-production-5341.up.railway.app/assets/images/placeholder.png'; 
  }
  trackByCategoryId(index: number, item: any) { 
    return item?.category_id ?? index; 
  }

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
        combined.forEach((p: any) => { 
          if (p && p.product_id) prodMap.set(p.product_id, p); 
        });
        existing.products = Array.from(prodMap.values());
        map.set(id, existing);
      }
    });
    return Array.from(map.values());
  }

  // CART LOGIC
  handleAddToCart(item: any) {
    this.cartItems.push(item);
    this.cartCount = this.cartItems.length;
  }

  selectedProduct: any = null;

  onProductSelected(product: any) {
    this.selectedProduct = product;
  }

  loadProductDetails(id: number) {
    const allProducts = this.categories.flatMap(c => c.products || []);
    const product = allProducts.find(p => p.product_id == id);
    // if (product) this.selectedProduct = product;
    if (product) {
    this.onProductSelected(product);  // correct way
  }
  }

  // closeProductView() { this.selectedProduct = null; }

  updateRelatedProducts(product: any) {
  this.relatedProducts = this.categories
    .find(c => String(c.category_id) === String(product.category_id))?.products
    .filter((p: any) => p.product_id !== product.product_id) // exclude current product
    ?.slice(0, 4) ?? []; // limit to 4
}




}