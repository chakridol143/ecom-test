import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Navbar } from './components/navbar/navbar';
import { Menu } from './components/menu/menu';
import { Filter } from './components/filter/filter';
import { Slider } from './components/slider/slider';
import { AdminControlPanelComponent } from './components/admin-control-panel/admin-control-panel';
import { CommonModule } from '@angular/common';
import { LoginService } from './components/login/services/login.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,Menu,Header,AdminControlPanelComponent,CommonModule], 
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {

  adminLoggedIn = false;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    // Listen for admin session updates
    this.loginService.adminState$.subscribe((admin) => {
      this.adminLoggedIn = !!admin;
    });

    // Sync from localStorage on page refresh
    if (localStorage.getItem('adminToken')) {
      this.adminLoggedIn = true;
    }
  }
}