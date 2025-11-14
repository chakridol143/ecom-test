import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, } from '@angular/core';
import { CartDetails } from '../cart-details/cart-details';
import { CartService } from './services/cart.services';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartDetails,],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {

  @Input() cartCount : number = 0;
  @Input() items : any[] = [];
  showCartPopup: boolean = false;


  constructor(private cart:CartService){}

  ngOnInit(): void {
    this.cart.cart$.subscribe(items=>{
      this.items = items;
      this.cartCount = items.length;
    })
    this.items = this.cart.getItems();
    this.cartCount = this.items.length;
  }

  
  toggleCartDetails(){
    this.showCartPopup = !this.showCartPopup;
}

closeDetails(){
  this.showCartPopup = false;
}

  cartItemRemove(index: number) {
    this.cart.removeFromCart(index);
  }

 handleClear() {
    this.cart.clearCart();
  }
}

  