import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Footer } from "../footer/footer";
import { CartService } from '../cart/services/cart.services';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, Footer],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductList implements OnInit, OnChanges {

  @Output() addToCartEvent = new EventEmitter<any>();
  @Input() searchTerm: string = '';
  @Input() categoryId: number | null = null;

  products: any[] = [];
  allProducts: any[] = [];
  loading = false;
  error: string | null = null;

  selectedProducts: any = null;
  showProductPopup = false;

  showLoginDialog = false;

  // ⭐ NEW FLAG
  showFullDetails = false;

  private apiHost = 'http://localhost:3000';
  private apiHost1 = 'http://localhost:3001';
  private adminUrl = 'http://localhost:3000/api/admin/products'
  private productsUrl = `${this.apiHost}/api/products`;
  private categoryProductsUrl = `${this.apiHost1}/api/category`;
  // private apiHost = 'https://ecom-backend-production-5341.up.railway.app';
  // private apiHost1 = 'https://ecom-backend-production-5341.up.railway.app'
  // private productsUrl = `${this.apiHost}/api/products`;
  // private categoryProductsUrl = `${this.apiHost1}/api/category`;
  constructor(
    private http: HttpClient,
    private cart: CartService,
  
  ) {}
private getHeaders() {
    return {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('adminToken')
      }
    };
  }
  
  getAll(): Observable<any> {
    return this.http.get(this.adminUrl, this.getHeaders());
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.adminUrl}/${id}`, this.getHeaders());
  }

  createProduct(data: FormData): Observable<any> {
    return this.http.post(this.adminUrl, data, this.getHeaders());
  }

  updateProduct(id: number, data: FormData): Observable<any> {
    return this.http.put(`${this.adminUrl}/${id}`, data, this.getHeaders());
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.adminUrl}/${id}`, this.getHeaders());
  }
  ngOnInit() {
    this.loadAllProducts();
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
  openProductPopup(product: any) {
    this.selectedProducts = product;
    this.showProductPopup = true;
  }

  closeProductPopup() {
    this.showProductPopup = false;
    this.selectedProducts = null;
  }
}
