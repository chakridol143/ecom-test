import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Search } from '../search/search';
import { SearchBusService } from '../search/services/search-bus.service';
import { LoginService } from '../login/services/login.service';
import { Filter } from '../filter/filter';
import { Navbar } from '../navbar/navbar';
import { ViewStateService } from '../services/view-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, Search, Filter, Navbar],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {

  user: any = null;

  @ViewChild('filterComponent') filterComponent!: Filter;

  menuOpen = false;

  constructor(
    private auth: LoginService,
    private router: Router,
    private searchBus: SearchBusService,
    private viewState: ViewStateService
  ) {}

  ngOnInit() {
    this.auth.userState$.subscribe((user) => {
      this.user = user;
    });
  }

  onSearch(term: string) {
    this.searchBus.setTerm((term || '').trim());
  }

  logout() {
    this.auth.logout();
    this.user = null;
    this.router.navigate(['/login']);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // === Navbar events from <app-navbar> ===

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

  onProductSelected(product: any) {
    this.viewState.setSelectedProduct(product);
  }
}
