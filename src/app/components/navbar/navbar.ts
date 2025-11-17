import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  menuItems = [
    { name: 'All', icon: '☰' },
    { name: 'Gold Jewellery' },
    { name: 'Silver Jewellery' },
    { name: 'Diamond Collection' },
    { name: 'Bracelets' },
    { name: 'Earrings' },
    { name: 'Rings' },
    { name: 'Necklaces' },
    { name: 'Bestsellers' },
    { name: 'New Arrivals' },
    { name: 'Offers' },
    { name: 'Premium Collection' }
  ];
}


