import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ViewState {
  showWomensCollection: boolean;
  showReleases: boolean;
  showBestsellers: boolean;
  showMensCollection: boolean;
  selectedProduct: any | null;
}

const initialState: ViewState = {
  showWomensCollection: false,
  showReleases: false,
  showBestsellers: false,
  showMensCollection: false,
  selectedProduct: null
};

@Injectable({
  providedIn: 'root'
})
export class ViewStateService {
  private stateSubject = new BehaviorSubject<ViewState>(initialState);
  readonly state$ = this.stateSubject.asObservable();

  private patch(partial: Partial<ViewState>) {
    this.stateSubject.next({
      ...this.stateSubject.value,
      ...partial
    });
  }

  clearCollections() {
    this.patch({
      showWomensCollection: false,
      showReleases: false,
      showBestsellers: false,
      showMensCollection: false
    });
  }

  showWomensCollection() {
    this.patch({
      showWomensCollection: true,
      showReleases: false,
      showBestsellers: false,
      showMensCollection: false,
      selectedProduct: null
    });
  }

  showReleases() {
    this.patch({
      showWomensCollection: false,
      showReleases: true,
      showBestsellers: false,
      showMensCollection: false,
      selectedProduct: null
    });
  }

  showBestsellers() {
    this.patch({
      showWomensCollection: false,
      showReleases: false,
      showBestsellers: true,
      showMensCollection: false,
      selectedProduct: null
    });
  }

  showMensCollection() {
    this.patch({
      showWomensCollection: false,
      showReleases: false,
      showBestsellers: false,
      showMensCollection: true,
      selectedProduct: null
    });
  }

  setSelectedProduct(product: any) {
    this.patch({ selectedProduct: product });
  }

  clearSelectedProduct() {
    this.patch({ selectedProduct: null });
  }
}
