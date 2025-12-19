import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.html',
  styleUrls: ['./slider.css']
})
export class Slider implements OnInit, OnDestroy {

  constructor(private http: HttpClient) {}

  @Output() categorySelect = new EventEmitter<number>();

  images = [
    '../../../assets/images/Beige and Brown Minimal Festive Sale Banner.png',
    '../../../assets/images/Ivory and Brown Minimalist Elegant Jewelry Summer Sale Facebook Post.png',
    '../../../assets/images/Brown and White Minimalist Jewelry New Collection Facebook Post.png',
    '../../../assets/images/Neutral Collage Sale Web Banner.png',
    '../../../assets/images/Beige Minimalist Mothers Day Sale Promotional Banner (1).png',
    
    // '../../../assets/images/slider8.png'
  ];

  sliderMap: { [key: string]: number } = {
    '../../../assets/images/cr4.png': 1,
    '../../../assets/images/cr2.png': 7,
    '../../../assets/images/cr3.png': 5,
    '../../../assets/images/cr5.png': 2,
    '../../../assets/images/cr1.png':3,
    // '../../../assets/images/slider8.png':4

  };

  currentIndex = 0;
  relatedImages: string[] = [];

  autoSlide: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    if (this.autoSlide) {
      clearInterval(this.autoSlide);
    }
  }

  /** Auto-slide every 5 seconds */
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

  // onSliderClick(img: string) {
  //   const categoryId = this.sliderMap[img];
  //   if (categoryId) {
  //     this.categorySelect.emit(categoryId);
  //     this.loadRelatedImages(categoryId);
  //   }
  // }

  /** Loads related products only when clicked */
  loadRelatedImages(categoryId: number) {
    this.http.get<any[]>(`https://ecom-backend-production-c71b.up.railway.app/products/category/${categoryId}`)
      .subscribe(res => {
        this.relatedImages = res.map(p => p.image_url);
      });
  }
}
