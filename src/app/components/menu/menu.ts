import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ProductList } from '../product-list/product-list';
import { Cart } from '../cart/cart';
import { SearchBusService } from '../search/services/search-bus.service'; 
import { Slider } from '../slider/slider';
import { Navbar } from '../navbar/navbar';
import { Router } from '@angular/router';
import { ProductSelectionService } from '../filter/filter-results.services';
import { Filter } from '../filter/filter';
import { WomensCollections } from '../womens-collections/womens-collections';
import { Releases } from '../releases/releases';
import { Bestsellers } from '../bestsellers/bestsellers';
import { MensCollections } from '../mens-collections/mens-collections';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ProductList,
    Cart,
    Slider,
    Navbar,
    Filter,
    WomensCollections,
    Releases,
    Bestsellers,
    MensCollections
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

  private baseUrl = 'https://ecom-backend-production-5341.up.railway.app/api/categories/with-products/all';
  private sub?: Subscription;

  constructor(
    private http: HttpClient,
    private searchBus: SearchBusService,
    private productSelection: ProductSelectionService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.http.get<any[]>(this.baseUrl).subscribe({
      next: (data) => { this.categories = this.dedupeCategories(data || []); },
      error: (err) => { console.error('Error loading categories:', err); },
    });

    this.sub = this.searchBus.term$.subscribe(t => {
      this.searchTerm = t ?? '';
    });

    this.productSelection.selectedProduct$.subscribe(product => {
      if (product) this.selectedProduct = product;
    });
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
    if (product) this.selectedProduct = product;
  }

  closeProductView() { this.selectedProduct = null; }

  // ====== COLLECTION VIEW TOGGLES ======

  showWomensCollection = false;
  showReleases = false;
  showBestsellers = false;
  showMensCollection = false;

  private resetViews() {
    this.showWomensCollection =
    this.showReleases =
    this.showBestsellers =
    this.showMensCollection = false;
    this.selectedProduct = null;
  }

  // WOMEN
  showWomenCollections() {
    this.resetViews();
    this.showWomensCollection = true;
  }
  closeWomensCollection() { this.showWomensCollection = false; }

  // RELEASES
  showNewReleases() {
    this.resetViews();
    this.showReleases = true;
  }
  closeReleases() { this.showReleases = false; }

  // BESTSELLERS
  showBestSellers() {
    this.resetViews();
    this.showBestsellers = true;
  }
  closeBestsellers() { this.showBestsellers = false; }

  // MENS
  showMensCollections() {
    this.resetViews();
    this.showMensCollection = true;
  }
  closeMensCollections() { this.showMensCollection = false; }
}
