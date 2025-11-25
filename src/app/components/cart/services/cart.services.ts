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
  // private apiUrl = 'http://localhost:3000/api/cart';
   private apiUrl = 'https://ecom-backend-production-5341.up.railway.app/api/cart';

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
      console.warn("⛔ Skipping invalid item:", item);
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
      error: err => console.error("❌ Error saving:", err)
    });

  });

  console.log("All local cart items synced to DB.");
}



// addToCart(item: any) {
//   if (!item.product_id) {
//     console.error("Item missing product_id:", item);
//     return;
//   }

//   const userId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");

//   if (userId && token) {
//     // ✅ LOGGED IN → SAVE DIRECTLY TO DATABASE
//     const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

//     const payload = {
//       user_id: Number(userId),
//       product_id: item.product_id,
//       quantity: item.quantity || 1
//     };

//     this.http.post(this.apiUrl, payload, { headers })
//       .subscribe({
//         next: (res) => {
//           console.log("✔ Cart item saved to DB:", res);

//           // update local cart too
//           this.items.push(item);
//           this.saveItems();
//         },
//         error: (err) => {
//           console.error("❌ Error saving item to DB:", err);
//         }
//       });

//   } else {
//     // 🟡 GUEST USER → SAVE TO LOCAL STORAGE
//     this.items.push(item);
//     this.saveItems();

//     console.log("🟡 Item saved to LOCAL cart:", item);
//   }
// }
 addToCart(item: any) {
    if (!item || !item.product_id) {
      console.error("Item missing product_id:", item);
      return;
    }

    const userIdStr = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const isLoggedIn = !!userIdStr && !!token;

    // LOGGING for debugging — remove in production
    console.log("ADD TO CART called:", { product_id: item.product_id, isLoggedIn, userIdStr });

    if (!isLoggedIn) {
      // logged in -> send to backend
      const user_id = Number(userIdStr);
      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

      const payload = {
        // prefer server to read user from token, but include user_id if your API expects it
        user_id,
        product_id: item.product_id,
        quantity: item.quantity || 1
      }

      this.http.post(this.apiUrl, payload, { headers }).subscribe({
        next: (res) => {
          console.log("✔ Cart item saved to DB:", res);
          // also keep client-side state in-sync
          this.items.push({ ...item, quantity: payload.quantity });
          this.saveItems();
        },
        error: (err) => {
          console.error("❌ Error saving item to DB:", err);
          // fallback: keep item locally to avoid losing it
          this.items.push(item);
          this.saveItems();
        }
      });

    } else {
      // guest -> only localStorage
      console.log("🟡 Guest user — saving item only in localStorage");
      this.items.push(item);
      this.saveItems();
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

