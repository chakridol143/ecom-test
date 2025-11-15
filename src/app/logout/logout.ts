import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../components/login/services/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.html',
  styleUrls: ['./logout.css']
})
export class Logout {
  user: any = null;

  constructor(private router: Router, private auth: LoginService) {}

    logout() {
    this.auth.logout();
    this.user = null;
    this.router.navigate(['/menu']);
  }
}
