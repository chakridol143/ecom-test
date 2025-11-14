import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-details',
  imports: [CommonModule],
  templateUrl: './cart-details.html',
  styleUrl: './cart-details.css'
})
export class CartDetails {
  @Output() close = new EventEmitter<void>();
  @Input() items : any[] = [];
  @Output() clear = new EventEmitter<void>();
  @Output() remove = new EventEmitter<number>();
  constructor(private router : Router){}

   getTotal(): number {
    return this.items.reduce((sum, it) => sum + Number(it.price || 0), 0);
  }
  onRemove(index:number){
    this.remove.emit(index)
  }

   onClose() {
    this.close.emit();
  }

    onClear() {
    this.clear.emit();
  }

onCheck() {
   this.router.navigate(['/checkout'])
    }

}
