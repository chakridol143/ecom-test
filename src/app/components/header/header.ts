// import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
// import { Router, RouterLink } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { Search } from '../search/search';
// import { SearchBusService } from '../search/services/search-bus.service';
// import { LoginService } from '../login/services/login.service';
// import { Filter } from '../filter/filter';
// import { Navbar } from '../navbar/navbar';
// import { ViewStateService } from '../services/view-state.service';

// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [RouterLink, CommonModule, Search, Filter,Navbar],
//   templateUrl: './header.html',
//   styleUrls: ['./header.css']
// })
// export class Header implements OnInit {

//   user: any = null;
//   admin: any = null;
//   adminLoggedIn = false;

//   @ViewChild('filterComponent') filterComponent!: Filter;

//   menuOpen = false;
//     isScrolled = false;

//   @HostListener('window:scroll', [])
//   onWindowScroll() {
//     this.isScrolled = window.scrollY > 10; 
//   }

//   constructor(
//     private auth: LoginService,
//     private router: Router,
//     private searchBus: SearchBusService,
//     private viewState: ViewStateService
//   ) {}

//   ngOnInit() {

  
//     this.auth.userState$.subscribe((user) => {
//       this.user = user;
//     });


//     this.auth.adminState$.subscribe((admin) => {
//       this.admin = admin;
//       this.adminLoggedIn = !!admin;
//     });
//   }

//   onSearch(term: string) {
//     this.searchBus.setTerm((term || '').trim());
//   }

//   logoutUser() {
//     this.auth.logout();
//     this.user = null;
//     this.router.navigate(['/login']);
//   }

//   logoutAdmin() {
//     this.auth.adminLogout();
//     this.admin = null;
//     this.adminLoggedIn = false;
//     this.router.navigate(['/admin-login']);
//   }

//   toggleMenu() {
//     this.menuOpen = !this.menuOpen;
//   }

//   showWomenCollections() {
//     this.viewState.showWomensCollection();
//   }

//   showNewReleases() {
//     this.viewState.showReleases();
//   }

//   showBestSellers() {
//     this.viewState.showBestsellers();
//   }

//   showMensCollections() {
//     this.viewState.showMensCollection();
//   }
//   selectedProduct: any = null;
//   onProductSelected(product: any) {
//     this.viewState.setSelectedProduct(product);
//   }
//   closeProductView(){
//     this.selectedProduct = null;
//   }
// }
import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SearchBusService } from '../search/services/search-bus.service';
import { LoginService } from '../login/services/login.service';
import { Filter } from '../filter/filter';
import { ViewStateService } from '../services/view-state.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../navbar/navbar';
import { CartDetails } from '../cart-details/cart-details';
import { CartService } from '../cart/services/cart.services';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [  RouterLink, 
    CommonModule, 
    FormsModule, 
    CartDetails            
    ],
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
  showCartPopup: boolean = false;
  @Input() items : any[] = [];
  @Input() cartCount : number = 0;
  // @ViewChild('filterComponent') filterComponent!: Filter;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }

  constructor(
    private auth: LoginService,
    private router: Router,
    private searchBus: SearchBusService,
    private viewState: ViewStateService,
    private cart:CartService
  ) {}

  
  ngOnInit() {
    this.auth.userState$.subscribe(user => this.user = user);
    this.auth.adminState$.subscribe(admin => this.adminLoggedIn = !!admin);
     this.cart.cart$.subscribe(items=>{
      this.items = items;
      this.cartCount = items.length;
    })
    this.items = this.cart.getItems();
    this.cartCount = this.items.length;
  }
  closeDetails(){
  this.showCartPopup = false;
}
  cartItemRemove(index: number) {
  const token = sessionStorage.getItem('token') ?? undefined;
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const user_Id = user.user_id || user.id;

  this.cart.removeFromCart(index, user_Id, token);
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

  logoutAdmin() {
    this.auth.adminLogout();
    this.adminLoggedIn = false;
    this.router.navigate(['/app']);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
 
  selectedProduct: any = null;
  onProductSelected(product: any) {
    this.viewState.setSelectedProduct(product);
  }
  closeProductView(){
    this.selectedProduct = null;
  }

logoClick() {
  this.router.navigate(['']);
}
  toggleCartDetails(){
    this.showCartPopup = !this.showCartPopup;
}
 handleClear() {
    this.cart.clearCart();
  }


  goto(route: string) {
  // this.isAllMenuOpen = false; // optional: close dropdown
  this.router.navigate([route]);
}

}
