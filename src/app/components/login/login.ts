import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from './services/login.service';

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

  constructor(private router: Router, private loginService: LoginService) {}

  onLogin() {
    this.loginService.login(this.email, this.password).subscribe({
      next: (res) => {
        this.loginService.saveSession(res.token, res.user);
        this.showDialog = true;
      },
      error: () => {
        alert("Invalid Email or Password");
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
