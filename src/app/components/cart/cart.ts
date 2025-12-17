// import { CommonModule } from '@angular/common';
// import { Component, Input, OnInit, } from '@angular/core';
// import { CartService } from './services/cart.services';


// @Component({
//   selector: 'app-cart',
//   standalone: true,
//   imports: [CommonModule, ],
//   templateUrl: './cart.html',
//   styleUrl: './cart.css'
// })
// export class Cart implements OnInit {

//   @Input() cartCount : number = 0;
//   @Input() items : any[] = [];
//   showCartPopup: boolean = false;


//   constructor(private cart:CartService){}

//   ngOnInit(): void {
//     this.cart.cart$.subscribe(items=>{
//       this.items = items;
//       this.cartCount = items.length;
//     })
//     this.items = this.cart.getItems();
//     this.cartCount = this.items.length;
//   }

  
//   toggleCartDetails(){
//     this.showCartPopup = !this.showCartPopup;
// }

// closeDetails(){
//   this.showCartPopup = false;
// }


//   cartItemRemove(index: number) {
//   const token = sessionStorage.getItem('token') ?? undefined;
//   const user = JSON.parse(sessionStorage.getItem('user') || '{}');
//   const user_Id = user.user_id || user.id;

//   this.cart.removeFromCart(index, user_Id, token);
// }


//  handleClear() {
//     this.cart.clearCart();
//   }
// }

//   import { CommonModule } from '@angular/common';
// import { Component, Input, OnInit } from '@angular/core';
// import { CartDetails } from '../cart-details/cart-details';
// import { CartService } from './services/cart.services';

// @Component({
//   selector: 'app-cart',
//   standalone: true,
//   imports: [CommonModule,],
//   templateUrl: './cart.html',
//   styleUrl: './cart.css'
// })
// export class Cart implements OnInit {

//   @Input() cartCount: number = 0;
//   @Input() items: any[] = [];
//   showCartPopup: boolean = false;

//   constructor(private cart: CartService) {}

//   ngOnInit(): void {
//     this.cart.cart$.subscribe(items => {
//       this.items = items;
//       this.cartCount = items.length;
//     });

//     this.items = this.cart.getItems();
//     this.cartCount = this.items.length;
//   }

//   toggleCartDetails() {
//     this.showCartPopup = !this.showCartPopup;
//   }

//   closeDetails() {
//     this.showCartPopup = false;
//   }

//   cartItemRemove(index: number) {
//     const token = sessionStorage.getItem('token') ?? undefined;
//     const user = JSON.parse(sessionStorage.getItem('user') || '{}');
//     const user_Id = user.user_id || user.id;

//     this.cart.removeFromCart(index, user_Id, token);
//   }

//   handleClear() {
//     this.cart.clearCart();
//   }
// }
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './services/cart.services';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {

  @Input() cartCount: number = 0;
  @Input() items: any[] = [];
  showCartPopup: boolean = false;

  constructor(private cart: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cart.cart$.subscribe(items => {
      this.items = items;
      this.cartCount = items.length;
    });

    this.items = this.cart.getItems();
    this.cartCount = this.items.length;
  }

  getTotal(): number {
    return this.items.reduce((sum, it) => sum + Number(it.price || 0), 0);
  }

  cartItemRemove(index: number) {
    const token = sessionStorage.getItem('token') ?? undefined;
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const user_Id = user.user_id || user.id;
    this.cart.removeFromCart(index, user_Id, token);
  }

  handleClear() {
    this.cart.clearCart();
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
