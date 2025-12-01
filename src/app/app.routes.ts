import { Routes } from '@angular/router';
import { login, login as LoginComponent } from './components/login/login';
import { CartDetails } from './components/cart-details/cart-details';
import { Checkout } from './components/checkout/checkout';
import { Menu } from './components/menu/menu';
import { Logout } from './logout/logout';
import { RegisterComponent } from './components/register/register';
import { Navbar } from './components/navbar/navbar';
import { FilterResults } from './components/filter-results/filter-results';
import { AdminControlPanelComponent } from './components/admin-control-panel/admin-control-panel';
import { AdminAuthGuard } from './components/gaurds/admin.auth';
import { Productdetails } from './components/productdetails/productdetails';

export const routes: Routes = [

  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'login', component: login },
  { path: 'logout', component: Logout },
  { path: 'register', component: RegisterComponent },
  { path: 'menu', component: Menu },
  { path: 'navbar', component: Navbar },
  { path: 'cartdetails', component: CartDetails },
  { path: 'checkout', component: Checkout },
  { path: 'filter-results', component: FilterResults },
  { path: 'productdetails/:id', component: Productdetails },
  {path: 'admin',component: AdminControlPanelComponent,canActivate: [AdminAuthGuard]},
  {path: 'admin-login',loadComponent: () =>import('./components/login/login').then(m => m.login)}
];
