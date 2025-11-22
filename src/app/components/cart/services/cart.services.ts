import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private key = 'cart-key';
  private items: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable();
  private apiUrl = 'https://ecom-backend-production-5341.up.railway.app/api/cart';

  constructor(private http: HttpClient) {
    const storedItems = localStorage.getItem(this.key);
    if (storedItems) {
      this.items = JSON.parse(storedItems);
      this.cartSubject.next(this.items);
    }
  }
  addToCart(item: any): void {
  this.items.push(item);
  this.saveItems();
  console.log("Item added to local cart:", item);
}

  removeFromCart(index: number, user_Id?: number, token?: string): void {
  if (index >= 0 && index < this.items.length) {
    const removedItem = this.items[index];
    this.items.splice(index, 1);
    this.saveItems();

    
    if (user_Id && removedItem && removedItem.product_id && token) {
      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

      this.http
        .delete(`${this.apiUrl}/${user_Id}/${removedItem.product_id}`, { headers })
        .subscribe({
          next: (res) => console.log('✅ Cart item removed from backend:', res),
          error: (err) => console.error('❌ Error removing from backend:', err),
        });
    }

 
    this.cartSubject.next(this.items);
  }
}
getCartByUserId(user_Id: number, token?: string) {
  return this.http.get(`${this.apiUrl}/user/${user_Id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
  setCartItems(items: any[]) {
    this.items = items;
    this.cartSubject.next(items);
    localStorage.setItem(this.key, JSON.stringify(items));
  }

  clearCart(localOnly = false): void {
    this.items = [];
    this.saveItems();
    if (localOnly) return;
  }


  loadCartForUser(userId: number, token: string): void {
  const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

  this.http.get<any[]>(`${this.apiUrl}/user/${userId}`, { headers }).subscribe({
    next: (rows) => {
      
      this.items = rows.map(row => ({
        id: row.product_id,
        product_id: row.product_id,
        name: row.name,
        price: row.price,
        image_url: row.image_url,
        quantity: row.quantity
      }));

      this.saveItems();
      console.log("Loaded cart from DB:", this.items);
    },
    error: (err) => console.error('Error loading user cart:', err)
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
  onClick(item:any):any{
    this.items.push(item);
    this.saveItems();
  }
}

