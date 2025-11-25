import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../../cart/services/cart.services';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // private apiUrl = 'http://localhost:3000/api/auth';
  private apiUrl = 'https://ecom-backend-production-5341.up.railway.app/api/auth';
  private userState = new BehaviorSubject<any>(this.getUser());
  userState$ = this.userState.asObservable();

  constructor(private http: HttpClient, private cartService: CartService) {}

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

    console.log('✅ Session saved for user:', user);

   const userId = this.getUserId();
  if (userId) {
    this.cartService.loadCartForUser(userId, token);
  }
  }

  logout() {
    sessionStorage.clear();
    this.userState.next(null);
    this.cartService.clearCart(true);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

 isLoggedIn(): boolean {
  const token = localStorage.getItem('token');
  return !!token && token.split('.').length === 3; // ensures valid JWT format
}


  getUser() {
    return JSON.parse(sessionStorage.getItem('user') || 'null');
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

getUserId() {
  const user = JSON.parse(sessionStorage.getItem('user')||'{}');
  if (!user) return null;

  return user.id || user.user_id || user.userID || null;
}

saveUser(user:any){
  sessionStorage.setItem('user', JSON.stringify(user));
  this.userState.next(user)
}

}
