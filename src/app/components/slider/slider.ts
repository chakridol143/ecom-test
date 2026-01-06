import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.html',
  styleUrls: ['./slider.css']
})
export class Slider implements OnInit, OnDestroy {

  images = [
    '../../../assets/images/Beige and Brown Minimal Festive Sale Banner.png',
    '../../../assets/images/Ivory and Brown Minimalist Elegant Jewelry Summer Sale Facebook Post.png',
    '../../../assets/images/Brown and White Minimalist Jewelry New Collection Facebook Post.png',
    '../../../assets/images/Neutral Collage Sale Web Banner.png',
    '../../../assets/images/Beige Minimalist Mothers Day Sale Promotional Banner (1).png',
    
  ];

 
  currentIndex = 0;
  autoSlide: any;



  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    if (this.autoSlide) {
      clearInterval(this.autoSlide);
    }
  }

  startAutoSlide() {
    this.autoSlide = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }


}
