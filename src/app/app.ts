import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Slider } from './components/slider/slider';
import { CommonModule } from '@angular/common';
import { LoginService } from './components/login/services/login.service';
import { filter } from 'rxjs';
import { category } from './components/category/category';
import { Cart } from './components/cart/cart';
import { Footer } from './components/footer/footer';
import { Banner1 } from './components/banner1/banner1';
import { WatchNshop } from './components/watch-nshop/watch-nshop';




@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet, Header, CommonModule, Slider, category, WatchNshop, Footer, Banner1], 
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {

  @Input() cartCount = 0;
  @Input() cartItems: any[] = [];
  adminLoggedIn = false;
  categories: any[] = [];
  selectedCategory: any = null;
  selectedCategoryId: number | null = null;
  searchTerm = '';
  currentRoute: string = '';


  constructor(private loginService: LoginService,private router: Router) {
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.urlAfterRedirects;
    });}
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
     //   showSliderAndCategories(): boolean {
    
  //   const hideRoutes = ['/bestsellers', '/releases', '/mens', '/womens','/menu', '/product'];
  //   return !hideRoutes.includes(this.currentRoute);
    
  // }

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
    this.currentRoute.startsWith('/cart') 
  );
}
onCategorySelected(id: number | null) {
  if (!id) return;

  this.selectedCategoryId = id;

  this.router.navigate(['/products', id]);
}



  handleAddToCart(item: any) {
    this.cartItems.push(item);
    this.cartCount = this.cartItems.length;
  }


  }