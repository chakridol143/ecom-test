import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment.prod";
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private key = 'cart-key';
  private items: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable();
  private apiUrl = `${environment.apiUrl}/api/cart`;

  constructor(private http: HttpClient) {
    const storedItems = localStorage.getItem(this.key);
    if (storedItems) {
      this.items = JSON.parse(storedItems);
      this.cartSubject.next(this.items);
    }
  }

  
  addToCart(item: any, userId: number, token: string): void {
    this.items.push(item);
    this.saveItems();

    const payload = {
      user_id: userId,
      product_id: item.id || item.product_id,
      quantity: item.quantity || 1
    };

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.post(`${this.apiUrl}`, payload, { headers }).subscribe({
      next: (res) => console.log(' Cart item added to backend:', res),
      error: (err) => console.error(' Error adding to backend:', err)
    });
  }

  removeFromCart(index: number, token?: string): void {
    if (index >= 0 && index < this.items.length) {
      const removedItem = this.items[index];
      this.items.splice(index, 1);
      this.saveItems();

      if (removedItem && removedItem.cart_item_id && token) {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        this.http.delete(`${this.apiUrl}/${removedItem.cart_item_id}`, { headers }).subscribe({
          next: (res) => console.log(' Cart item removed:', res),
          error: (err) => console.error(' Error removing:', err)
        });
      }
    }
  }

  clearCart(localOnly = false): void {
    this.items = [];
    this.saveItems();
    if (localOnly) return;
  }


  loadCartForUser(userId: number, token: string): void {
    if (!userId || !token) return;
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get<any[]>(`${this.apiUrl}/user/${userId}`, { headers }).subscribe({
      next: (data) => {
        this.items = data || [];
        this.saveItems();
        console.log(`🛒 Loaded cart for user ${userId}:`, this.items);
      },
      error: (err) => console.error(' Error loading user cart:', err)
    });
  }

  private saveItems(): void {
    localStorage.setItem(this.key, JSON.stringify(this.items));
    this.cartSubject.next(this.items);
  }

  getTotal(): number {
    return this.items.reduce((sum, it) => sum + Number(it.price || 0), 0);
  }

  getItems(): any[] {
    return this.items;
  }
}