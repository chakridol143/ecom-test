

import { RouterModule, Routes } from '@angular/router';
import { login } from './components/login/login';
import { CartDetails } from './components/cart-details/cart-details';
import { Checkout } from './components/checkout/checkout';
import { Logout } from './logout/logout';
import { RegisterComponent } from './components/register/register';
import { Navbar } from './components/navbar/navbar';
import { Slider } from './components/slider/slider';
import { ProductList } from './components/product-list/product-list';
import { MensCollections } from './components/mens-collections/mens-collections';
import { WomensCollections } from './components/womens-collections/womens-collections';
import { Bestsellers } from './components/bestsellers/bestsellers';
import { Releases } from './components/releases/releases';

// import { Menu } from './components/menu/menu';
import { NgModule } from '@angular/core';
import { Productdetails } from './components/productdetails/productdetails';
import { AdminControlPanelComponent } from './components/admin-control-panel/admin-control-panel';
import { AdminAuthGuard } from './components/gaurds/admin.auth';
import { Banner1 } from './components/banner1/banner1';
import { KidsCollections } from './kids-collections/kids-collections';
import { WhatsappLogo } from './whatsapp-logo/whatsapp-logo';
import { ChatWidgetComponent } from './components/chat-widget/chat-widget';







export const routes: Routes = [
  
  { path: 'login', component: login },
  { path: 'logout', component: Logout },
  { path: 'cartdetails', component: CartDetails },
  { path: 'checkout', component: Checkout },
  { path: 'register', component: RegisterComponent },
  { path: 'navbar', component: Navbar },
  { path: 'slider', component: Slider },
  // { path: 'cart', component: Cart }  ,
  { path: 'bestsellers', component: Bestsellers },
{ path: 'releases', component: Releases },
{ path: 'banner1', component: Banner1 },
{ path: 'mens', component: MensCollections },
{ path: 'womens', component: WomensCollections },
{path: 'admin',component: AdminControlPanelComponent,canActivate: [AdminAuthGuard]},
{path: 'admin-login',loadComponent: () =>import('./components/login/login').then(m => m.login)},
{ path: 'KidsCollections', component: KidsCollections },

{ path: '', component: ProductList }, // HOME scroll view

{ path: 'products', component: ProductList }, // scroll
{ path: 'products/view-all', component: ProductList, data: { view: 'names' } }, // ✅ NEW GRID
{ path: 'products/:categoryId', component: ProductList, data: { view: 'full' } }, //when clicking on category

{ path: 'product/:id', component: Productdetails }, //product details

{ path: 'whatsapp', component: WhatsappLogo }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
