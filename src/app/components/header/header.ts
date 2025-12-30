import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SearchBusService } from '../search/services/search-bus.service';
import { LoginService } from '../login/services/login.service';
import { ViewStateService } from '../services/view-state.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartDetails } from '../cart-details/cart-details';
import { CartService } from '../cart-details/services/cart.services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule,CartDetails],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {

  user: any = null;
  adminLoggedIn = false;

  menuOpen = false;
  isScrolled = false;

  searchOpen = false;
  overlaySearch = '';

  showCartPopup = false;

  @Input() items: any[] = [];
  @Input() cartCount: number = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }

  constructor(
    private auth: LoginService,
    private router: Router,
    private searchBus: SearchBusService,
    private viewState: ViewStateService,
    private cart: CartService
  ) {}

  ngOnInit() {
    this.auth.userState$.subscribe(user => this.user = user);
    this.auth.adminState$.subscribe(admin => this.adminLoggedIn = !!admin);

    this.cart.cart$.subscribe(items => {
      this.items = items;
      this.cartCount = items.length;
    });

    this.items = this.cart.getItems();
    this.cartCount = this.items.length;
  }

  

  toggleCartDetails() {
    this.showCartPopup = !this.showCartPopup;
  }

  closeDetails() {
    this.showCartPopup = false;
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

 

  openSearch() {
    this.searchOpen = true;
  }

  closeSearch() {
    this.searchOpen = false;
    this.overlaySearch = '';
  }

  performSearch() {
    this.onSearch(this.overlaySearch);
    this.closeSearch();
  }

  onSearch(term: string) {
    this.searchBus.setTerm((term || '').trim());
  }

  logoutUser() {
    this.auth.logout();
    this.user = null;
    this.router.navigate(['/app']);
  }

 

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logoClick() {
    this.router.navigate(['']);
  }

  goto(route: string) {
    this.router.navigate([route]);
  }


}
