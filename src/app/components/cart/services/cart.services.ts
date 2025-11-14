// import { Injectable } from "@angular/core";
// import { BehaviorSubject } from "rxjs";

// @Injectable({
//     providedIn:'root'
// })
// export class CartService{
//     private key = 'cart-key';
//     private items:any[]=[];

    

//   private cartSubject = new BehaviorSubject<any[]>([]);
//   cart$ = this.cartSubject.asObservable();

//     constructor(){
//         const storedItems = localStorage.getItem(this.key);
//         if(storedItems){
//             this.items = JSON.parse(storedItems);
//             this.cartSubject.next(this.items);
//         }
//     }
//     getItems():any[]{
//         return this.items;
//     }
//     addToCart(item:any):void{
//         this.items.push(item);
//         this.saveItems();
//     }
//     removeFromCart(index:number):void{
//         if(index >=0 && index < this.items.length){
//             this.items.splice(index,1);
//             this.saveItems();
//         }

//     }
//     clearCart(){
//         this.items = [];
//         this.saveItems();
//     }
//     private saveItems(){
//         localStorage.setItem(this.key, JSON.stringify(this.items));    
//         this.cartSubject.next(this.items);
//     }
//     getTotal():number{
//         return this.items.reduce((sum, it) => sum + Number(it.price || 0), 0);
//     }

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
  private apiUrl = 'http://localhost:3000/api/cart';

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


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface CartItem {
//   cart_item_id?: number;
//   user_id: number;
//   product_id: number;
//   quantity: number;
//   added_at?: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//   private baseUrl = 'http://localhost:3000/api/cart';

//   constructor(private http: HttpClient) {}

//   getAllCartItems(): Observable<CartItem[]> {
//     return this.http.get<CartItem[]>(this.baseUrl);
//   }

//   getCartItemById(id: number): Observable<CartItem> {
//     return this.http.get<CartItem>(`${this.baseUrl}/${id}`);
//   }

//   addCartItem(item: CartItem): Observable<any> {
//     return this.http.post(this.baseUrl, item);
//   }

//   updateCartItem(id: number, quantity: number): Observable<any> {
//     return this.http.put(`${this.baseUrl}/${id}`, { quantity });
//   }

//   deleteCartItem(id: number): Observable<any> {
//     return this.http.delete(`${this.baseUrl}/${id}`);
//   }
// }
// >>>>>>> fib
