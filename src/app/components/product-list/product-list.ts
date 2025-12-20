import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchBusService } from '../search/services/search-bus.service';
import { CartService } from '../cart-details/services/cart.services';



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductList implements OnInit {
addToCart(_t28: any) {
throw new Error('Method not implemented.');
}

  @Output() addToCartEvent = new EventEmitter<any>();
  @Input() searchTerm: string = '';
  // @Input() categoryId: number | null = null;
  viewMode: 'scroll' | 'full' | 'names' = 'scroll';
categoryId: number | null = null;

  
  @Input() limit: number | null = null;
@Input() excludeProductId: number | null = null;

  products: any[] = [];
  allProducts: any[] = [];
  loading = false;
  error: string | null = null;

  selectedProducts: any = null;
  showProductPopup = false;

  showLoginDialog = false;
  selectedCategoryId: number | null = null;

 
  showFullDetails = false;

  private apiHost = 'https://ecom-backend-production-c71b.up.railway.app';
  private apiHost1 = 'https://ecom-backend-production-c71b.up.railway.app';
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
    this.loadAllProducts();
  });

  this.searchBus.term$.subscribe(term => {
    this.searchTerm = term.trim();
  });

  this.route.data.subscribe(data => {
    this.viewMode = data['view'] ?? 'scroll';
    this.showFullDetails = this.viewMode === 'full';
  });
}

 onCategorySelected(categoryId: number) {
  this.loading = true;              
  this.selectedCategoryId = categoryId;

  
  setTimeout(() => {
    this.products = this.allProducts.filter(
      p => Number(p.category_id) === Number(categoryId)
    );

    this.loading = false;           
  }, 600); // 400–800ms is ideal
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

  private loadAllProducts() {
  this.loading = true;
  this.error = null;

  this.http.get<any[]>(this.productsUrl).subscribe({
    next: (data) => {
      this.allProducts = (Array.isArray(data) ? data : []).map(product => ({
        ...product,
        currentImage: product.image_url 
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


viewAllProducts() {
  this.router.navigate(['/products/view-all']);
}

}