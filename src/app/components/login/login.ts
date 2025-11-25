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

  constructor(private router: Router, private loginService: LoginService,private cartServices:CartService) {}

  onLogin() {
  this.loginService.login(this.email, this.password).subscribe({
    next: (res) => {
       this.loginService.saveSession(res.token, res.user);
        this.showDialog = true;
      console.log("LOGIN RESPONSE:", res);

      const userId = res.user?.user_id; 
      const token = res.token;

      if (!userId) {
        console.error("❌ userId still undefined. Wrong key in login response.");
        return;
      }

      // Save to localStorage
      localStorage.setItem("userId", userId.toString());
      localStorage.setItem("token", token);

      // Merge Local Cart → DB
      this.cartServices.mergeCartAfterLogin(userId, token);

      // Close popup and refresh checkout
      this.close.emit();   // Trigger parent event to hide popup
    },
    error: (err) => {
      console.error("❌ Login failed:", err);
    }
  });
}



  closeDialog() {
    this.showDialog = false;
    this.router.navigate(['/menu']); 
    this.close.emit();
  }
  
  onClose() {
    this.router.navigate(['menu']);
  }
}
