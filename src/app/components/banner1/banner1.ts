import { CommonModule } from '@angular/common';
import {  Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner1',
  imports: [CommonModule],
  templateUrl: './banner1.html',
  styleUrl: './banner1.css'
})
export class Banner1 {
  constructor(private router: Router) {}


  products = [
    { img1: '../../../assets/images/North Star - Gold2.webp', name: 'Bangles' },
    { img1: '../../../assets/images/Tigers Eye Signet Ring - Gold2.webp', name: 'Bangles' },
    { img1: '../../../assets/images/5-2.webp', name: 'Bangles' },
    { img1: '../../../assets/images/Gold Figaro Bracelet2.webp', name: 'Figaro Bracelet' },
    { img1: '../../../assets/images/Gold Rope Bracelet (5MM)2.webp', name: 'Rope Bracelet' },
    { img1: '../../../assets/images/Cross Drop (Gold)2.webp', name: 'Cross Drop' },
    { img1: '../../../assets/images/Hammered Band Ring - Gold2.webp', name: 'Hammered Ring' },
    { img1: '../../../assets/images/Mini Bar - Gold2.webp', name: 'Mini Bar' },
    { img1: '../../../assets/images/Tigers Eye Signet Ring - Gold2.webp', name: 'Tiger Signet' }
  ];

  currentIndex = 0;

  get bigImg() {
    return this.products[this.currentIndex];
  }

  get small1() {
    return this.products[(this.currentIndex + 1) % this.products.length];
  }

  get small2() {
    return this.products[(this.currentIndex + 2) % this.products.length];
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.products.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.products.length) % this.products.length;
  }

  showFrom(index: number) {
    this.currentIndex = index;
  }
  goToMens() {
    this.router.navigate(['/mens']);
  }
  goToKids(){
    this.router.navigate(['/KidsCollections'])
  }
}
