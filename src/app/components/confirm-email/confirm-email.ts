import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  template: `
    <div style="text-align:center; margin-top:40px;">
      <h2>{{message}}</h2>
      <button *ngIf="done" (click)="goLogin()">Go to Login</button>
    </div>
  `
})
export class ConfirmEmailComponent implements OnInit {

  message = 'Verifying email...';
  done = false;

  private BASE_URL = 'http://localhost:3000/api/auth';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.message = 'Invalid token.';
      this.done = true;
      return;
    }

    this.http.get(`${this.BASE_URL}/confirm-email?token=${token}`)
      .subscribe({
        next: () => {
          this.message = 'Email verified successfully!';
          this.done = true;
        },
        error: () => {
          this.message = 'Invalid or expired token.';
          this.done = true;
        }
      });
  }
  goLogin() {
    this.router.navigate(['/login']);
  }
}
