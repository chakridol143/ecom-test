import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../../cart/services/cart.services';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // private apiUrl = 'http://localhost:3000/api/auth';
  // private adminUrl = 'http://localhost:3000/api/auth/admin/login';
 private apiUrl = 'https://ecom-backend-production-5341.up.railway.app/api/auth';
  private adminUrl = 'https://ecom-backend-production-5341.up.railway.app/api/auth/admin/login';
  private userState = new BehaviorSubject<any>(this.getUser());
  userState$ = this.userState.asObservable();

  private adminState = new BehaviorSubject<any>(this.getAdmin());
  adminState$ = this.adminState.asObservable();

  constructor(private http: HttpClient, private cartService: CartService,) {}

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  register(data: any) {
    return this.http.post<any>(`${this.apiUrl}/register`, data);
  }

  saveSession(token: string, user: any) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    this.userState.next(user);

    const userId = this.getUserId();
    if (userId) {
      this.cartService.loadCartForUser(userId, token);
    }
  }

  logout() {
    sessionStorage.clear();
    this.userState.next(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
   isLoggedIn(): boolean {
    const token = sessionStorage.getItem('token');
    return !!token && token.split('.').length === 3;
  }

  /* ADMIN LOGIN */
  adminLogin(email: string, password: string) {
    return this.http.post<any>(`${this.adminUrl}`, { email, password });
  }

  saveAdminSession(token: string) {
    localStorage.setItem('adminToken', token);
    this.adminState.next({ token });
  }

  // adminLogout() {
  //   localStorage.removeItem('adminToken');
  //   this.adminState.next(null);
  // }
adminLogout() {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("admin");
}

  getAdmin() {
    return localStorage.getItem('adminToken') ? { token: localStorage.getItem('adminToken') } : null;
  }

  getUser() {
    return JSON.parse(sessionStorage.getItem('user') || 'null');
  }

  getUserId() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    return user.id || user.user_id || null;
  }
}
