import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from './services/login.service';
import { CartService } from '../cart/services/cart.services';

declare const google: any; // ✅ REQUIRED

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class login {

  @Output() close = new EventEmitter<void>();

  email = '';
  password = '';
  showDialog = false;
  error = '';
  showPassword = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private cartServices: CartService
  ) {}

  onBackgroundClick(){
    this.router.navigate(['/app'])
  }

  submitLogin() {
    const adminEmail = "nallaravikishore@gmail.com";
    const adminPassword = "Ravi_@123";

    if (this.email === adminEmail && this.password === adminPassword) {
      this.adminLogin();
    } else {
      this.onLogin();
    }
  }

  // 🔹 NORMAL USER LOGIN
  onLogin() {
    this.loginService.login(this.email, this.password).subscribe({
      next: (res) => {
        this.loginService.saveSession(res.token, res.user);
        this.showDialog = true;

        const userId = res.user?.user_id;
        const token = res.token;

        if (!userId) return;

        localStorage.setItem("userId", userId.toString());
        localStorage.setItem("token", token);

        this.cartServices.mergeCartAfterLogin(userId, token);
        this.close.emit();
      },
      error: (err) => {
        console.error("❌ Login failed:", err);
      }
    });
  }

  // 🔹 ADMIN LOGIN
  adminLogin() {
    if (!this.email.trim() || !this.password.trim()) {
      this.error = "Email and Password are required";
      return;
    }

    this.loginService.adminLogin(this.email, this.password).subscribe({
      next: (res) => {
        this.loginService.saveAdminSession(res.token);
        sessionStorage.setItem("admin", JSON.stringify({ email: this.email }));
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.error = "Invalid Email or Password";
      }
    });
  }

  closeDialog() {
    this.showDialog = false;
    this.router.navigate(['/app']);
    this.close.emit();
  }

  onClose() {
    this.router.navigate(['/app']);
  }

  // -----------------------------------------------------
  // ✅ GOOGLE LOGIN BELOW
  // -----------------------------------------------------
  loginWithGoogle() {
    google.accounts.id.initialize({
      client_id: "903633108888-060od4a8pomrecrla9kifepblbdtp5b4.apps.googleusercontent.com",
      callback: (response: any) => this.handleGoogleResponse(response)
    });

    google.accounts.id.prompt();
  }

  handleGoogleResponse(response: any) {
    const credential = response.credential;
    const user = this.decodeJwt(credential);

    console.log("GOOGLE USER:", user);

    // 👉 TODO: You can send this user/email to your backend to create/login user
  }

  decodeJwt(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
