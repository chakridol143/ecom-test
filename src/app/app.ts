import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Slider } from './components/slider/slider';
import { CommonModule } from '@angular/common';
import { LoginService } from './components/login/services/login.service';
import { filter } from 'rxjs';
import { category } from './components/category/category';
import { WatchNshop } from "./watch-nshop/watch-nshop";
import { Footer } from './components/footer/footer';
import { Banner1 } from './components/banner1/banner1';
import { WhatsappLogo } from './whatsapp-logo/whatsapp-logo';
import { ChatWidgetComponent } from './components/chat-widget/chat-widget';



@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet, Header, CommonModule, Slider, category, WatchNshop, Footer, Banner1,WhatsappLogo, ChatWidgetComponent], 
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {

  
  adminLoggedIn = false;
  
  currentRoute: string = '';


  constructor(private loginService: LoginService,private router: Router) {
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.urlAfterRedirects;
    });}

     ngOnInit() {
    this.loginService.adminState$.subscribe((admin) => {
      this.adminLoggedIn = !!admin;
    });

    if (localStorage.getItem('adminToken')) {
      this.adminLoggedIn = true;
    }
  }
    

  showSliderAndCategories(): boolean {
  return !(
    this.currentRoute.startsWith('/bestsellers') ||
    this.currentRoute.startsWith('/releases') ||
    this.currentRoute.startsWith('/mens') ||
    this.currentRoute.startsWith('/womens') ||
    this.currentRoute.startsWith('/menu') ||
    this.currentRoute.startsWith('/product') ||
    this.currentRoute.startsWith('/admin') ||
    this.currentRoute.startsWith('/login') ||
    this.currentRoute.startsWith('/register') ||
    this.currentRoute.startsWith('/cart') ||
    this.currentRoute.startsWith('/KidsCollections') ||
     this.currentRoute.startsWith('/checkout') ||
     this.currentRoute.startsWith('/payments')

    
  );
}

showHeaderOnly(): boolean {
    
  return this.currentRoute.startsWith('/login') ||this.currentRoute.startsWith('/register') || this.currentRoute.startsWith('/logout') || this.currentRoute.startsWith('/admin') || this.currentRoute.startsWith('/checkout');
}

  }