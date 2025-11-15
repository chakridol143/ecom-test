import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Search } from '../search/search';
import { SearchBusService } from '../search/services/search-bus.service';
import { LoginService } from '../login/services/login.service';
import { Filter } from '../filter/filter';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, Search, Filter],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {

  user: any = null;
   isFilterVisible = false;

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

  
  toggleFilter() {
    this.isFilterVisible = !this.isFilterVisible;
  }
}
