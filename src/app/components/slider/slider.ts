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
    '../../../assets/images/adv1.jpg',
    '../../../assets/images/adv2.webp',
    '../../../assets/images/adv3.webp',
    '../../../assets/images/adv4.webp',
    '../../../assets/images/adv5.webp'
  ];

  sliderMap: { [key: string]: number } = {
    '../../../assets/images/adv1.jpg': 1,
    '../../../assets/images/adv2.webp': 8,
    '../../../assets/images/adv3.webp': 7,
    '../../../assets/images/adv4.webp': 5,
    '../../../assets/images/adv5.webp': 2
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

  onSliderClick(img: string) {
    const categoryId = this.sliderMap[img];
    if (categoryId) {
      this.categorySelect.emit(categoryId);
      this.loadRelatedImages(categoryId);
    }
  }

  /** Loads related products only when clicked */
  loadRelatedImages(categoryId: number) {
    this.http.get<any[]>(`https://ecom-backend-production-5341.up.railway.app/products/category/${categoryId}`)
      .subscribe(res => {
        this.relatedImages = res.map(p => p.image_url);
      });
  }
}
