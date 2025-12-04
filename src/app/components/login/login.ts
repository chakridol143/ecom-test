// import { Component, EventEmitter, Output } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterLink } from '@angular/router';
// import { LoginService } from './services/login.service';
// import { CartService } from '../cart/services/cart.services';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterLink],
//   templateUrl: './login.html',
//   styleUrls: ['./login.css']
// })
// export class login {

//   @Output() close = new EventEmitter<void>();
//   email = '';
//   password = '';
//   showDialog = false;
//   error = '';

//   constructor(private router: Router, private loginService: LoginService,private cartServices:CartService) {}

//   submitLogin() {
//     const adminEmail = "nallaravikishore@gmail.com";
//     const adminPassword = "Ravi_@123";

//     // 1️⃣ ADMIN LOGIN CHECK
//     if (this.email === adminEmail && this.password === adminPassword) {
//       this.adminLogin();
//     } 
//     else {
//       this.onLogin();
//     }
//   }
//   onLogin() {
//   this.loginService.login(this.email, this.password).subscribe({
//     next: (res) => {
//        this.loginService.saveSession(res.token, res.user);
//         this.showDialog = true;
//       console.log("LOGIN RESPONSE:", res);

//       const userId = res.user?.user_id; 
//       const token = res.token;

//       if (!userId) {
//         console.error("❌ userId still undefined. Wrong key in login response.");
//         return;
//       }

//       // Save to localStorage
//       localStorage.setItem("userId", userId.toString());
//       localStorage.setItem("token", token);

//       // Merge Local Cart → DB
//       this.cartServices.mergeCartAfterLogin(userId, token);

//       // Close popup and refresh checkout
//       this.close.emit();   // Trigger parent event to hide popup
//     },
//     error: (err) => {
//       console.error("❌ Login failed:", err);
//     }
    
//   });
// }

// adminLogin() {
//   if (!this.email.trim() || !this.password.trim()) {
//     this.error = "Email and Password are required";
//     return;
//   }

//   this.loginService.adminLogin(this.email, this.password).subscribe({
//     next: (res) => {
//       console.log("ADMIN LOGIN RESPONSE:", res);

      
//       this.loginService.saveAdminSession(res.token);

      
//       sessionStorage.setItem("admin", JSON.stringify({ email: this.email }));

     
//       this.error = "";

    
//       this.router.navigate(['/admin']);
//     },

//     error: (err) => {
//       console.error("❌ Admin Login Failed:", err);
//       this.error = "Invalid Email or Password";
//     }
//   });
// }

//   closeDialog() {
//     this.showDialog = false;
//     this.router.navigate(['/menu']); 
//     this.close.emit();
//   }
  
//   onClose() {
//     this.router.navigate(['menu']);
//   }
// }
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from './services/login.service';
import { CartService } from '../cart/services/cart.services';

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
        console.log("LOGIN RESPONSE:", res);

        const userId = res.user?.user_id;
        const token = res.token;

        if (!userId) {
          console.error("❌ userId is undefined. Wrong backend response.");
          return;
        }

        localStorage.setItem("userId", userId.toString());
        localStorage.setItem("token", token);

        // merge guest cart → db
        this.cartServices.mergeCartAfterLogin(userId, token);

        this.close.emit(); // close popup
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
        console.log("ADMIN LOGIN RESPONSE:", res);

        this.loginService.saveAdminSession(res.token);
        sessionStorage.setItem("admin", JSON.stringify({ email: this.email }));

        this.error = "";
        this.router.navigate(['/admin']);
      },

      error: (err) => {
        console.error("❌ Admin Login Failed:", err);
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

}