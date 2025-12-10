import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.html',
  styleUrl: './logout.css'
})
export class Logout {

  @Output() close = new EventEmitter<void>();
userName: any;

  constructor(private router:Router){}

  onLogout(){
    this.router.navigate(['app']);
  }
}
