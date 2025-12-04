import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from './services/login.service';
import { CartService } from '../cart/services/cart.services';

declare const google: any; // Important for TypeScript
declare global {
  interface Window {
    google: any;
  }
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class login implements OnInit {

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

  // -----------------------------------------------------
  // 🚀 LOAD GOOGLE SDK DYNAMICALLY
  // -----------------------------------------------------
  ngOnInit(): void {
    this.loadGoogleSDK();
  }

  loadGoogleSDK() {
    const script = document.createElement('script');
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log("Google Identity Services SDK Loaded.");
    };

    document.body.appendChild(script);
  }

  // -----------------------------------------------------
  // 🔹 NORMAL LOGIN (Your existing code)
  // -----------------------------------------------------
  onBackgroundClick() {
    this.router.navigate(['/app']);
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

loginWithGoogle() {
  console.log("Google Login Button CLICKED");

  const checkGoogle = setInterval(() => {
    if (window.google && google.accounts && google.accounts.oauth2) {
      clearInterval(checkGoogle);

      console.log("Google SDK READY. Opening popup...");

      const client = google.accounts.oauth2.initCodeClient({
        client_id: "903633108888-060od4a8pomrecrla9kifepblbdtp5b4.apps.googleusercontent.com",
        scope: "email profile openid",
        ux_mode: "popup",
        callback: (response: any) => {
          console.log("GOOGLE POPUP RESPONSE:", response);
          // TODO: send response.code to backend for token exchange
        }
      });

      client.requestCode();
    }
  }, 200);
}



  handleGoogleResponse(response: any) {
    const credential = response.credential;
    const user = this.decodeJwt(credential);

    console.log("GOOGLE USER:", user);

    // 👉 Optional: send to backend to register/login user
    // this.loginService.googleLogin(user).subscribe(...)
  }

  decodeJwt(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
