
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './services/cart.services';


@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-details.html',
  styleUrl: './cart-details.css'
})
export class CartDetails {

  @Input() items: any[] = [];

  @Input() isOpen = false;
  @Input() isCartOpen = false;

  @Output() close = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();
  @Output() remove = new EventEmitter<number>();

  constructor(private router: Router,private cart : CartService) {}

   getTotal(): number {
    return this.items.reduce((sum, it) => sum + (Number(it.price || 0) * (it.quantity || 1)), 0);
  }

  onRemove(index: number) {
    this.remove.emit(index);
  }

  closeCart() {
    this.close.emit();
  }

  onClear() {
    this.clear.emit();
  }

  onCheck() {
    this.router.navigate(['/checkout']);
    this.
    close.emit();
  }
  incQty(index: number) {
  const item = this.items[index];
  if (item) {
    item.quantity = (item.quantity || 1) + 1;
    this.cart.updateQuantity(item.cart_item_id, item.quantity);

  }
}

decQty(index: number) {
  const item = this.items[index];
  if (item && item.quantity > 1) {
    item.quantity--;
    this.cart.updateQuantity(item.cart_item_id, item.quantity);

  }
}
}
