
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Footer } from "../footer/footer";
import { CartService } from '../cart/services/cart.services';
import { LoginService } from '../login/services/login.service';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, Footer],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductList implements OnInit {
  @Output() addToCartEvent = new EventEmitter<any>();
 products: any[] = [];
  selectedProduct: any = null;
  productId: number | null = null;
  loading = false;
  error: string | null = null;
  showProductPopup = false;
selectedProducts: any = null;

  @Input() searchTerm: string = '';
  private apiHost = 'http://localhost:3000';
  private apiHost1 = 'http://localhost:3001'
  private productsUrl = `${this.apiHost}/api/products`;
  private categoryProductsUrl = `${this.apiHost1}/api/category`;
  @Input() categoryId: number | null = null;
  private allProducts: any[] = [];
  constructor(private http: HttpClient,private cart:CartService,private loginService:LoginService) {}
  ngOnInit() {
    this.loadAllProducts();
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
fetchProductsByCategory(categoryId: number) {
    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      this.products = [];
      return;
    }
    this.loading = true;
    this.error = null;
    const url = `${this.categoryProductsUrl}/${categoryId}/products`;
    this.http.get<{ success?: boolean; products?: any[] }>(url).subscribe({
      next: (res) => {
        this.products = (res && (res as any).products) ? (res as any).products : (Array.isArray(res) ? res as any[] : []);
        this.loading = false;
        console.log(`Fetched ${this.products.length} products for category ${categoryId}`);
      },
      error: (err) => {
        console.error('Error fetching products by category:', err);
        this.error = 'Failed to load products for category';
        this.products = [];
        this.loading = false;
      }
    });
  }
  private loadAllProducts() {
    this.loading = true;
    this.error = null;
    this.http.get<any[]>(this.productsUrl).subscribe({
      next: (data) => {
        this.allProducts = Array.isArray(data) ? data : [];
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
 
  onImgError(evt: Event) {
    (evt.target as HTMLImageElement).src = 'assets/placeholder.png';
  }


  // dialog box 
  showLoginDialog = false;
  addToCart(product: any) {
    const userId = this.loginService.getUserId();
    const token = this.loginService.getToken();

    // console.log('🧾 Checking login →', { userId, token });

    if (!userId || !token) {
      // alert('Please log in to add items to cart');
      // return;
          this.openLoginDialog();
      return;
    }

    this.cart.addToCart(product, userId, token);
  }


    openLoginDialog() {
    this.showLoginDialog = true;
  }

  closeLoginDialog() {
    this.showLoginDialog = false;
  }

  goToLogin() {
    this.showLoginDialog = false;
    window.location.href = '/login'; // or use Angular router
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