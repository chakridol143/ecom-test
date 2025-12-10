import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-banner1',
  imports: [CommonModule],
  templateUrl: './banner1.html',
  styleUrl: './banner1.css'
})
export class Banner1 {


  products = [
    { img1: '../../../assets/images/3-1.webp', name: 'Bangles' },
    { img1: '../../../assets/images/4-1.webp', name: 'Bangles' },
    { img1: '../../../assets/images/5-1.webp', name: 'Bangles' },
    { img1: '../../../assets/images/Gold Figaro Bracelet1.webp', name: 'Figaro Bracelet' },
    { img1: '../../../assets/images/Gold Rope Bracelet (5MM)1.webp', name: 'Rope Bracelet' },
    { img1: '../../../assets/images/Cross Drop (Gold)1.webp', name: 'Cross Drop' },
    { img1: '../../../assets/images/Hammered Band Ring - Gold1.webp', name: 'Hammered Ring' },
    { img1: '../../../assets/images/Mini Bar - Gold1.webp', name: 'Mini Bar' },
    { img1: '../../../assets/images/Tigers Eye Signet Ring - Gold1.webp', name: 'Tiger Signet' }
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
}
