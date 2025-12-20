import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductSelectionService {
  private productSource = new BehaviorSubject<any>(null);
  selectedProduct$ = this.productSource.asObservable();

  selectProduct(product: any) {
    this.productSource.next(product);
  }
}
