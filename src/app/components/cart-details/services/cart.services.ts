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
   private apiUrl = 'https://ecom-backend-production-c71b.up.railway.app/api/cart';

  constructor(private http: HttpClient) {
    const storedItems = localStorage.getItem(this.key);
    if (storedItems) {
      this.items = JSON.parse(storedItems);
      this.cartSubject.next(this.items);
    }
  }

mergeCartAfterLogin(user_Id: number, token: string) {
  const items = this.getItems();

  if (!items || items.length === 0) {
    console.log("No local items to sync.");
    return;
  }

  items.forEach(item => {

    if (!item.product_id) {
      console.warn("Skipping invalid item:", item);
      return;
    }

    const payload = {
      user_id: user_Id,
      product_id: item.product_id,
      quantity: item.quantity || 1
    };

    console.log("SENDING PAYLOAD:", payload);

    this.http.post(this.apiUrl, payload).subscribe({
      next: res => console.log("Added to DB:", res),
      error: err => console.error("Error saving:", err)
    });

  });

  console.log("All local cart items synced to DB.");
}

    addToCart(item: any) {
    if (!item || !item.product_id) {
      console.error("Item missing product_id:", item);
      return;
    }

    const userIdStr = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const isLoggedIn = !!userIdStr && !!token;

    const existingItem = this.items.find(i => i.product_id === item.product_id);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + (item.quantity || 1);
      this.saveItems();

      if (isLoggedIn) {
        this.updateQuantity(item.product_id, existingItem.quantity);
      }
    } else {
      if (isLoggedIn) {
        const user_id = Number(userIdStr);
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        const payload = {
          user_id,
          product_id: item.product_id,
          quantity: item.quantity || 1
        };

        this.http.post(this.apiUrl, payload, { headers }).subscribe({
          next: (res) => {
            console.log("✔ Cart item saved to DB:", res);
            this.items.push({ ...item, quantity: payload.quantity });
            this.saveItems();
          },
          error: (err) => {
            console.error("Error saving item to DB:", err);
            this.items.push(item);
            this.saveItems();
          }
        });
      } else {
        this.items.push(item);
        this.saveItems();
      }
    }
  }

   updateQuantity(productId: number, quantity: number) {
  const item = this.items.find(i => i.product_id === productId);
  if (item) {
    item.quantity = quantity;
    this.saveItems(); 
  }

  const userIdStr = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  if (userIdStr && token) {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const payload = {
      user_id: Number(userIdStr),
      product_id: productId,
      quantity: quantity
    };
    this.http.post(this.apiUrl, payload, { headers }).subscribe({
      next: res => console.log("Cart quantity updated in DB:", res),
      error: err => console.error("Error updating quantity in DB:", err)
    });
  }
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
          next: (res) => console.log('Cart item removed from backend:', res),
          error: (err) => console.error('Error removing from backend:', err),
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
    localStorage.removeItem(this.key);
    this.cartSubject.next([])
    // this.saveItems();
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