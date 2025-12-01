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
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SearchBusService } from '../search/services/search-bus.service';
import { LoginService } from '../login/services/login.service';
import { Filter } from '../filter/filter';
import { ViewStateService } from '../services/view-state.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Search } from '../search/search';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [  RouterLink, 
    CommonModule, 
    FormsModule,              
    Search, 
    Filter,
    Navbar ],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {

  user: any = null;
  adminLoggedIn = false;

  menuOpen = false;
  isScrolled = false;

  /* ➤ SEARCH OVERLAY CONTROL */
  searchOpen = false;
  overlaySearch = '';

  @ViewChild('filterComponent') filterComponent!: Filter;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }

  constructor(
    private auth: LoginService,
    private router: Router,
    private searchBus: SearchBusService,
    private viewState: ViewStateService
  ) {}

  ngOnInit() {
    this.auth.userState$.subscribe(user => this.user = user);
    this.auth.adminState$.subscribe(admin => this.adminLoggedIn = !!admin);
  }

  /* =======================
      SEARCH FUNCTIONS
  ======================== */
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
    this.router.navigate(['/login']);
  }

  logoutAdmin() {
    this.auth.adminLogout();
    this.adminLoggedIn = false;
    this.router.navigate(['/admin-login']);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

   showWomenCollections() {
    this.viewState.showWomensCollection();
  }

  showNewReleases() {
    this.viewState.showReleases();
  }

  showBestSellers() {
    this.viewState.showBestsellers();
  }

  showMensCollections() {
    this.viewState.showMensCollection();
  }
  selectedProduct: any = null;
  onProductSelected(product: any) {
    this.viewState.setSelectedProduct(product);
  }
  closeProductView(){
    this.selectedProduct = null;
  }
}
