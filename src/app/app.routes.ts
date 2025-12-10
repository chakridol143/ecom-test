// import { Routes } from '@angular/router';
// import { login, login as LoginComponent } from './components/login/login';
// import { CartDetails } from './components/cart-details/cart-details';
// import { Checkout } from './components/checkout/checkout';
// import { Menu } from './components/menu/menu';
// import { Logout } from './logout/logout';
// import { RegisterComponent } from './components/register/register';
// import { Navbar } from './components/navbar/navbar';
// import { FilterResults } from './components/filter-results/filter-results';
// import { AdminControlPanelComponent } from './components/admin-control-panel/admin-control-panel';
// import { AdminAuthGuard } from './components/gaurds/admin.auth';
// import { Productdetails } from './components/productdetails/productdetails';

// export const routes: Routes = [

//   { path: '', redirectTo: 'menu', pathMatch: 'full' },
//   { path: 'login', component: login },
//   { path: 'logout', component: Logout },
//   { path: 'register', component: RegisterComponent },
//   { path: 'menu', component: Menu },
//   { path: 'navbar', component: Navbar },
//   { path: 'cartdetails', component: CartDetails },
//   { path: 'checkout', component: Checkout },
//   { path: 'filter-results', component: FilterResults },
//   { path: 'productdetails/:id', component: Productdetails },
//   {path: 'admin',component: AdminControlPanelComponent,canActivate: [AdminAuthGuard]},
//   {path: 'admin-login',loadComponent: () =>import('./components/login/login').then(m => m.login)}
// ];

import { RouterModule, Routes } from '@angular/router';
import { login } from './components/login/login';
import { CartDetails } from './components/cart-details/cart-details';
import { Checkout } from './components/checkout/checkout';
import { Logout } from './logout/logout';
import { RegisterComponent } from './components/register/register';
import { Navbar } from './components/navbar/navbar';
import { Slider } from './components/slider/slider';
import { ProductList } from './components/product-list/product-list';
import { Cart } from './components/cart/cart';
import { MensCollections } from './components/mens-collections/mens-collections';
import { WomensCollections } from './components/womens-collections/womens-collections';
import { Bestsellers } from './components/bestsellers/bestsellers';
import { Releases } from './components/releases/releases';

import { Menu } from './components/menu/menu';
import { NgModule } from '@angular/core';
import { Productdetails } from './components/productdetails/productdetails';
import { AdminControlPanelComponent } from './components/admin-control-panel/admin-control-panel';
import { AdminAuthGuard } from './components/gaurds/admin.auth';
import { Banner1 } from './components/banner1/banner1';








export const routes: Routes = [
  
  { path: 'login', component: login },
  { path: 'logout', component: Logout },
  { path: 'cartdetails', component: CartDetails },
 
  { path: 'checkout', component: Checkout },
  { path: 'register', component: RegisterComponent },
  { path: 'navbar', component: Navbar },
  { path: 'slider', component: Slider },
  { path: '', component: ProductList },
  { path: 'products/:categoryId', component: ProductList },
  { path: '', redirectTo: 'ProductList', pathMatch: 'full' },
  { path: 'cart', component: Cart }  ,
  { path: 'bestsellers', component: Bestsellers },
{ path: 'releases', component: Releases },
{ path: 'banner1', component: Banner1 },
{ path: 'mens', component: MensCollections },
{ path: 'womens', component: WomensCollections },
{ path: 'menu', component: Menu },
{path: 'admin',component: AdminControlPanelComponent,canActivate: [AdminAuthGuard]},
{path: 'admin-login',loadComponent: () =>import('./components/login/login').then(m => m.login)},
{ path: 'product/:id', component: Productdetails }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
