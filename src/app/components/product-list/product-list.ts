import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart/services/cart.services';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchBusService } from '../search/services/search-bus.service';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductList implements OnInit, OnChanges {

  @Output() addToCartEvent = new EventEmitter<any>();
  @Input() searchTerm: string = '';
  @Input() categoryId: number | null = null;
  
  @Input() limit: number | null = null;
@Input() excludeProductId: number | null = null;

  products: any[] = [];
  allProducts: any[] = [];
  loading = false;
  error: string | null = null;

  selectedProducts: any = null;
  showProductPopup = false;

  showLoginDialog = false;

  // ⭐ NEW FLAG
  showFullDetails = false;

  // private apiHost = 'http://localhost:3000';
  // private apiHost1 = 'http://localhost:3001'
  // private productsUrl = ${this.apiHost}/api/products;
  // private categoryProductsUrl = ${this.apiHost1}/api/category;
  private apiHost = 'https://ecom-backend-production-5341.up.railway.app';
  private apiBase = 'https://ecom-backend-production-5341.up.railway.app';
  private apiHost1 = 'https://ecom-backend-production-5341.up.railway.app';
  private productsUrl = `${this.apiHost}/api/products`;
  private categoryProductsUrl = `${this.apiHost1}/api/category`;
  constructor(
    private http: HttpClient,
    private cart: CartService,
  private route: ActivatedRoute,
  private router: Router,
  private searchBus: SearchBusService
  ) {}

ngOnInit() {

  this.route.paramMap.subscribe(params => {
    const id = params.get('categoryId');
    this.categoryId = id ? Number(id) : null;

    this.showFullDetails = !!this.categoryId;

    this.loadAllProducts();
  });

  this.searchBus.term$.subscribe(term => {
    this.searchTerm = term.trim();
  });
}

 
  ngOnChanges() {
    this.showFullDetails = !!this.categoryId;
  }

  get productsToShow(): any[] {
    let list = this.allProducts;

    if (this.categoryId) {
      list = list.filter(p => this.getCategoryId(p) === this.categoryId);
    }

    const t = (this.searchTerm || '').trim().toLowerCase();
    if (t) {
      list = list.filter(p => (p?.name ?? '').toLowerCase().includes(t));
    }
    return list;
  }

  private getCategoryId(p: any): number | null {
    const id = Number(
      p?.category_id ??
      p?.categoryId ??
      p?.category?.id
    );
    return Number.isFinite(id) ? id : null;
  }

  // private loadAllProducts() {
  //   this.loading = true;
  //   this.error = null;

  //   this.http.get<any[]>(this.productsUrl).subscribe({
  //     next: (data) => {
  //       this.allProducts = Array.isArray(data) ? data : [];
  //       this.loading = false;
  //     },
  //     error: (err) => {
  //       console.error('Error loading all products:', err);
  //       this.error = 'Failed to load products';
  //       this.allProducts = [];
  //       this.loading = false;
  //     }
  //   });
  // }
  private loadAllProducts() {
  this.loading = true;
  this.error = null;

  this.http.get<any[]>(this.productsUrl).subscribe({
    next: (data) => {
      this.allProducts = (Array.isArray(data) ? data : []).map(product => ({
        ...product,
        currentImage: product.image_url // Start with original main image
      }));
      this.loading = false;
    },
    error: (err) => {
      console.error('Error loading all products:', err);
      this.error = 'Failed to load products';
      this.allProducts = [];
      this.loading = false;
    }
  });
}

onHoverImage(product: any) {
  if (product.image_url1) {
    product.currentImage = product.image_url1;
  }
}

onLeaveImage(product: any) {
  product.currentImage = product.image_url;
}


  onImgError(evt: Event) {
    (evt.target as HTMLImageElement).src = 'assets/placeholder.png';
  }

addToCart(product: any) {
    this.cart.addToCart(product);
  }
  // openProductPopup(product: any) {
  //   this.selectedProducts = product;
  //   this.showProductPopup = true;
  // }

  // closeProductPopup() {
  //   this.showProductPopup = false;
  //   this.selectedProducts = null;
  // }


  get filtered() {
  let items = this.products;

  if (this.excludeProductId) {
    items = items.filter(p => p.product_id !== this.excludeProductId);
  }

  if (this.limit) {
    items = items.slice(0, this.limit);
  }

  return items;
}


openProductDetails(product: any) {
  this.router.navigate(['/product', product.product_id]);
}

}