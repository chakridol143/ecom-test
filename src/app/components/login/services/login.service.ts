import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../../cart/services/cart.services';
import { environment } from '../../../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${environment.apiUrl}/api/auth`;
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

   
    this.cartService.loadCartForUser(user.id, token);
  }

  logout() {
    sessionStorage.clear();
    this.userState.next(null);
    this.cartService.clearCart(true);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  getUser() {
    return JSON.parse(sessionStorage.getItem('user') || 'null');
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  getUserId() {
  const user = JSON.parse(sessionStorage.getItem("user") || "null");
  if (!user) return null;
  return user.id || user.user_id || null;
}
saveUser(user:any){
  sessionStorage.setItem('user', JSON.stringify(user));
  this.userState.next(user)
}

}
