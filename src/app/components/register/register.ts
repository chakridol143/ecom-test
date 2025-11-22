
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../login/services/login.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  @Output() close = new EventEmitter<void>();

  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  phone = '';
  address = '';

  constructor(private router: Router, private auth: LoginService) {}

  onRegister() {
    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      alert('Please fill in all required fields ');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Confirm Password do not match ');
      return;
    }

    const payload = {
      name: this.username,
      email: this.email,
      password: this.password,
      phone: this.phone,
      address: this.address
    };

    this.auth.register(payload).subscribe({
      next: (res) => {
        alert('Registration successful! You can now log in.');
        if (res?.token && res?.user) {
          this.auth.saveSession(res.token, res.user);
        }
        this.router.navigate(['menu']);
        this.close.emit();
      },
      error: (err) => {
        const msg = err?.error?.message || 'Registration failed';
        alert(` ${msg}`);
        console.error('Register error:', err);
      }
    });
  }

  onClose() {
    this.router.navigate(['menu']);
  }

  onReset() {
    this.username = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.phone = '';
    this.address = '';
  }
}
