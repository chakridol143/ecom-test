import { Component, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoginService } from './services/login.service';
import { CartService } from '../cart-details/services/cart.services';


declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class login implements AfterViewInit {

  @Output() close = new EventEmitter<void>();

  email = '';
  password = '';
  showDialog = false;
  error = '';
  showPassword = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private cartServices: CartService
  ) {}


  ngAfterViewInit() {
    this.waitForGoogle();
  }

  private waitForGoogle() {
    if ((window as any).google?.accounts?.id) {
      this.initGoogle();
    } else {
      setTimeout(() => this.waitForGoogle(), 100);
    }
  }

  private initGoogle() {
    google.accounts.id.initialize({
      client_id: "127997694068-djgvmqj311ldteojrtc84gbkc8h7e9bb.apps.googleusercontent.com",
      callback: (response: any) => this.handleGoogleLogin(response),
      ux_mode: "popup",
      auto_select: false,
      use_fedcm_for_prompt: false
    });

    google.accounts.id.renderButton(
      document.getElementById("googleLoginBtn")!,
      {
        theme: "outline",
        size: "large",
        width: "100%"
      }
    );
  }

  private handleGoogleLogin(response: any) {
    if (!response?.credential) return;

    this.loginService.googleRegister(response.credential).subscribe({
      next: (res: any) => {
        this.loginService.saveSession(res.token, res.user);

        const userId = res.user?.user_id;
        const token = res.token;

        if (userId) {
          localStorage.setItem('userId', userId.toString());
          localStorage.setItem('token', token);
          this.cartServices.mergeCartAfterLogin(userId, token);
        }
        this.showDialog = false;

        this.close.emit();

        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error("Google login failed:", err);
        alert("Google Login failed");
      }
    });
  }

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
         if (err?.status === 403) {
        alert("Please verify your email before logging in.");
      } else if (err?.status === 401) {
        alert("Invalid email or password");
      } else if (err?.status === 404) {
        alert("User not found");
      } else {
        alert("Login failed");
      }
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
        this.error = "";
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.error("Admin Login Failed:", err);
        this.error = "Invalid Email or Password";
      }
    });
  }

  closeDialog() {
    this.showDialog = false;
    this.router.navigate(['/']);
    this.close.emit();
  }

  onClose() {
    this.router.navigate(['/app']);
  }
}
