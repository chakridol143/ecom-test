import { Routes } from '@angular/router';
import { login } from './components/login/login';
import { CartDetails } from './components/cart-details/cart-details';
import { Checkout } from './components/checkout/checkout';
import { Header } from './components/header/header';
import { Menu } from './components/menu/menu';
import { Logout } from './logout/logout';
import { RegisterComponent } from './components/register/register';
import { Navbar } from './components/navbar/navbar';




export const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'login', component:login},
  {path:'logout',component:Logout},
  {path:'cartdetails',component:CartDetails},
  {path:'header',component:Header},
  {path:'menu',component:Menu},
  {path:'checkout',component:Checkout},
   {path: 'register', component:RegisterComponent},
   {
    path:'navbar', component:Navbar
   }
];
