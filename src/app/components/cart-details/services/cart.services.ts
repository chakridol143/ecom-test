// import { Injectable } from "@angular/core";
// import { BehaviorSubject, Observable, of } from "rxjs";
// import { HttpClient, HttpHeaders } from "@angular/common/http";

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//   private key = 'cart-key';
//   private items: any[] = [];
//   private readonly KEY = 'recently_viewed_products';
//   private readonly MAX_ITEMS:number = 8;
//   private cartSubject = new BehaviorSubject<any[]>([]);
//   cart$ = this.cartSubject.asObservable();
//    private apiUrl = 'https://ecom-backend-production-c71b.up.railway.app/api/cart';

//   constructor(private http: HttpClient) {
//     const storedItems = localStorage.getItem(this.key);
//     if (storedItems) {
//       this.items = JSON.parse(storedItems);
//       this.cartSubject.next(this.items);
//     }
//   }

//  addRecentlyViewed(product: any) {
//   if (!product?.product_id) return;

//   let items = JSON.parse(
//     localStorage.getItem(this.KEY) || '[]'
//   );

//   // ❌ remove duplicate
//   items = items.filter(
//     (p: any) => p.product_id !== product.product_id
//   );

//   // ➕ add latest to top
//   items.unshift({
//     product_id: product.product_id,
//     name: product.name,
//     price: product.price,
//     image_url: product.image_url,
//     category_id: product.category_id
//   });

//   // 🔒 limit list
//   if (items.length > this.MAX_ITEMS) {
//     items.length = this.MAX_ITEMS;
//   }

//   localStorage.setItem(this.KEY, JSON.stringify(items));
// }

// getRecentlyViewed(): Observable<any> {
//   return of(JSON.parse(localStorage.getItem('recently_viewed_products') || '[]'));
// }


// clearRecentlyViewed() {
//   localStorage.removeItem(this.KEY);
// }

// mergeCartAfterLogin(user_Id: number, token: string) {
//   const items = this.getItems();

//   if (!items || items.length === 0) {
//     console.log("No local items to sync.");
//     return;
//   }

//   items.forEach(item => {

//     if (!item.product_id) {
//       console.warn("Skipping invalid item:", item);
//       return;
//     }

//     const payload = {
//       user_id: user_Id,
//       product_id: item.product_id,
//       quantity: item.quantity || 1
//     };

//     console.log("SENDING PAYLOAD:", payload);

//     this.http.post(this.apiUrl, payload).subscribe({
//       next: res => console.log("Added to DB:", res),
//       error: err => console.error("Error saving:", err)
//     });

//   });

//   console.log("All local cart items synced to DB.");
// }

// //    addToCart(item: any) {
// //   if (!item?.product_id) return;

// //   const userIdStr = localStorage.getItem("userId");
// //   const token = localStorage.getItem("token");
// //   const isLoggedIn = !!userIdStr && !!token;

// //   const existingItem = this.items.find(i => i.product_id === item.product_id);
// //   if (existingItem) {
// //     existingItem.quantity += item.quantity || 1;
// //     this.saveItems();

// //     if (isLoggedIn) {
// //       this.updateQuantity(existingItem.cart_item_id, existingItem.quantity);
// //     }
// //     return;
// //   }

// //   if (!isLoggedIn) {
// //     this.items.push({ ...item, quantity: item.quantity || 1 });
// //     this.saveItems();
// //     return;
// //   }

// //   const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
// //   const payload = {
// //     user_id: Number(userIdStr),
// //     product_id: item.product_id,
// //     quantity: item.quantity || 1
// //   };

// //   this.http.post<any>(this.apiUrl, payload, { headers }).subscribe({
// //     next: (res) => {
// //       this.items.push({
// //         cart_item_id: res.cart_item_id,
// //         ...item,
// //         quantity: payload.quantity
// //       });
// //       this.saveItems();
// //     },
// //     error: err => console.error("Error saving item to DB:", err)
// //   });
// // }
// addToCart(item: any) {
//   if (!item?.product_id) return;

//   const userIdStr = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");
//   const isLoggedIn = !!userIdStr && !!token;

//   const qtyToAdd = item.quantity && item.quantity > 0 ? item.quantity : 1;

//   // 🔁 Check existing item
//   const existingItem = this.items.find(
//     i => i.product_id === item.product_id
//   );

//   if (existingItem) {
//     existingItem.quantity += qtyToAdd;
//     this.saveItems();

//     if (isLoggedIn && existingItem.cart_item_id) {
//       this.updateQuantity(
//         existingItem.cart_item_id,
//         existingItem.quantity
//       );
//     }
//     return;
//   }

//   // 👤 Guest user
//   if (!isLoggedIn) {
//     this.items.push({
//       ...item,
//       quantity: qtyToAdd
//     });
//     this.saveItems();
//     return;
//   }

//   // 🔐 Logged-in user → DB insert
//   const headers = new HttpHeaders({
//     Authorization: `Bearer ${token}`
//   });

//   const payload = {
//     user_id: Number(userIdStr),
//     product_id: item.product_id,
//     quantity: qtyToAdd
//   };

//   this.http.post<any>(this.apiUrl, payload, { headers }).subscribe({
//     next: (res) => {
//       if (!res?.cart_item_id) {
//         console.error("❌ cart_item_id missing from backend response", res);
//         return;
//       }

//       this.items.push({
//         cart_item_id: res.cart_item_id,
//         ...item,
//         quantity: qtyToAdd
//       });
//       this.saveItems();
//     },
//     error: err => console.error("❌ Error saving item to DB:", err)
//   });
// }


// updateQuantity(cartItemId: number, quantity: number) {
//   const item = this.items.find(i => i.cart_item_id === cartItemId);
//   if (item) {
//     item.quantity = quantity;
//     this.saveItems();
//   }

//   const token = localStorage.getItem("token");
//   if (!token) return;

//   const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

//   this.http.put(
//     `${this.apiUrl}/${cartItemId}`,
//     { quantity },
//     { headers }
//   ).subscribe({
//     next: () => console.log("✔ Quantity updated in DB"),
//     error: err => console.error("Error updating quantity in DB:", err)
//   });
// }
//   removeFromCart(index: number, user_Id?: number, token?: string): void {
//   if (index >= 0 && index < this.items.length) {
//     const removedItem = this.items[index];
//     this.items.splice(index, 1);
//     this.saveItems();

    
//     if (user_Id && removedItem && removedItem.product_id && token) {
//       const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

//       this.http
//         .delete(`${this.apiUrl}/${user_Id}/${removedItem.product_id}`, { headers })
//         .subscribe({
//           next: (res) => console.log('Cart item removed from backend:', res),
//           error: (err) => console.error('Error removing from backend:', err),
//         });
//     }
//     this.cartSubject.next(this.items);
//   }
// }
// getCartByUserId(user_Id: number, token?: string) {
//   return this.http.get(`${this.apiUrl}/user/${user_Id}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// }
//   setCartItems(items: any[]) {
//     this.items = items;
//     this.cartSubject.next(items);
//     localStorage.setItem(this.key, JSON.stringify(items));
//   }

//   clearCart(localOnly = false): void {
//     this.items = [];
//     localStorage.removeItem(this.key);
//     this.cartSubject.next([])
//     if (localOnly) return;
//   }

// loadCartForUser(userId: number, token: string): void {
//   const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

//   this.http.get<any[]>(`${this.apiUrl}/user/${userId}`, { headers }).subscribe({
//     next: (rows) => {
//       this.items = rows.map(row => ({
//         cart_item_id: row.cart_item_id, 
//         product_id: row.product_id,
//         name: row.name,
//         price: row.price,
//         image_url: row.image_url,
//         quantity: row.quantity
//       }));
//       this.saveItems();
//     },
//     error: err => console.error('Error loading user cart:', err)
//   });
// }

//   private saveItems(): void {
//     localStorage.setItem(this.key, JSON.stringify(this.items));
//     this.cartSubject.next(this.items);
//   }

//   getTotal(): number {
//     return this.items.reduce((sum, it) => sum + Number(it.price || 0), 0);
//   }

//   getItems(): any[] {
//     return this.items;
//   }
//   onClick(item:any):any{
//     this.items.push(item);
//     this.saveItems();
//   }
// }
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

  private readonly RECENT_KEY = 'recently_viewed_products';
  private readonly MAX_ITEMS = 8;

  constructor(private http: HttpClient) {
    const stored = localStorage.getItem(this.key);
    if (stored) {
      this.items = JSON.parse(stored);
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


  addRecentlyViewed(product: any) {
    if (!product?.product_id) return;

    let items = JSON.parse(localStorage.getItem(this.RECENT_KEY) || '[]');

    items = items.filter((p: any) => p.product_id !== product.product_id);

    items.unshift({
      product_id: product.product_id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      category_id: product.category_id
    });

    if (items.length > this.MAX_ITEMS) {
      items = items.slice(0, this.MAX_ITEMS);
    }

    localStorage.setItem(this.RECENT_KEY, JSON.stringify(items));
  }

  getRecentlyViewed(): any[] {
    return JSON.parse(localStorage.getItem(this.RECENT_KEY) || '[]');
  }

  addToCart(item: any) {
    if (!item?.product_id) return;

    const userIdStr = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const isLoggedIn = !!userIdStr && !!token;

    const qty = item.quantity > 0 ? item.quantity : 1;

    const existing = this.items.find(i => i.product_id === item.product_id);

    if (existing) {
      existing.quantity += qty;
      this.saveItems();

      if (isLoggedIn && existing.cart_item_id) {
        this.updateQuantity(existing.cart_item_id, existing.quantity);
      }
      return;
    }

    if (!isLoggedIn) {
      this.items.push({ ...item, quantity: qty });
      this.saveItems();
      return;
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    const payload = {
      user_id: Number(userIdStr),
      product_id: item.product_id,
      quantity: qty
    };

    this.http.post<any>(this.apiUrl, payload, { headers }).subscribe(res => {
      this.items.push({
        cart_item_id: res.cart_item_id,
        ...item,
        quantity: qty
      });
      this.saveItems();
    });
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

  updateQuantity(cartItemId: number, quantity: number) {
    const item = this.items.find(i => i.cart_item_id === cartItemId);
    if (item) {
      item.quantity = quantity;
      this.saveItems();
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.put(`${this.apiUrl}/${cartItemId}`, { quantity }, { headers }).subscribe();
  }

  loadCartForUser(userId: number, token: string) {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get<any[]>(`${this.apiUrl}/user/${userId}`, { headers }).subscribe(rows => {     
      this.items = rows.map(row => ({
        cart_item_id: row.cart_item_id,
        product_id: row.product_id,
        name: row.name,
        price: row.price,
        image_url: row.image_url,
        quantity: row.quantity
      }));
      this.saveItems();
    });
  }

  private saveItems() {
    localStorage.setItem(this.key, JSON.stringify(this.items));
    this.cartSubject.next(this.items);
  }

  getItems(): any[] {
    return this.items;
  }
  getTotal(): number {
    return this.items.reduce((sum, it) => sum + Number(it.price || 0), 0);
  }
    clearCart(localOnly = false): void {
    this.items = [];
    localStorage.removeItem(this.key);
    this.cartSubject.next([])
    if (localOnly) return;
  }
}
