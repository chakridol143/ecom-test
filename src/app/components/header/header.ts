import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Search } from '../search/search';
import { SearchBusService } from '../search/services/search-bus.service';
import { LoginService } from '../login/services/login.service';
import { Filter } from '../filter/filter';
import { Navbar } from '../navbar/navbar';

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
    private searchBus: SearchBusService
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

  selectedProduct: any = null;

  onProductSelected(product: any) {
    this.selectedProduct = product;
  }
}
