import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { login } from '../login/login';
import { LoginService } from '../login/services/login.service';
import { CartService } from '../cart-details/services/cart.services';


@Component({
  selector: 'app-checkout',
  imports: [CommonModule, login],
  templateUrl:'./checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {

  @Input() items : any[] = [];
  @Output() close = new EventEmitter<void>();
  // showLoginPopup: boolean = false;

  totalAmount : number = 0;
  gstAmount : number = 0;
  grandTotal : number = 0;
  showDialog: boolean = false;
  
  constructor(private cartService : CartService, private router:Router, public loginService: LoginService) {}

  ngOnInit():void{
    this.items = this.cartService.getItems();
    this.calculateTotals();
  }
  removeItem(index:number){
    this.cartService.removeFromCart(index);
    this.items = this.cartService.getItems();
    this.calculateTotals();
  }
  clearCart(){
    this.cartService.clearCart();
    this.items = [];
    this.calculateTotals();
  }
  calculateTotals(){
    this.totalAmount = this.cartService.getTotal();
    this.gstAmount = this.totalAmount * 0.18;
    this.grandTotal = this.totalAmount + this.gstAmount; 
   }
  buyNow(){
    if(this.items.length === 0){
      alert('Your cart is empty. Please add items to cart before proceeding to buy.');
      return;
    }
   if (!this.loginService.isLoggedIn()) {
    this.router.navigate(['/login'], {
      queryParams: { redirect: 'checkout' }
    });
    return;
  }
    this.showDialog = true;
  }

  // onLoginClosed() {
  //   this.showLoginPopup = false;
  //   if(this.loginService.isLoggedIn()) {
  //     this.showDialog = true;
  //   }
  // }
    confirmPurchase() {
    this.clearCart();
    this.showDialog = false;
    this.close.emit();
  }

  closeDialog() {
    this.showDialog = false;
  }
   closePopup(){
    this.router.navigate(['/menu']);
   }

}
