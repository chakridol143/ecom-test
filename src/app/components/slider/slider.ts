import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.html',
  styleUrls: ['./slider.css']
})
export class Slider{
  
  constructor(private http: HttpClient) {}

  @Output() categorySelect = new EventEmitter<number>();

  images = [
    '../../../assets/images/banner-bangle.webp',
    '../../../assets/images/banner-oddiyaanam_3.webp',
    '../../../assets/images/banner-ring.webp',
    '../../../assets/images/banner-pendant.webp',
    '../../../assets/images/earrings_1.jpg'
  ];

  sliderMap: { [key: string]: number } = {
    '../../../assets/images/banner-bangle.webp': 1,
    '../../../assets/images/banner-oddiyaanam_3.webp': 8,
    '../../../assets/images/banner-ring.webp': 7,
    '../../../assets/images/banner-pendant.webp': 5,
    '../../../assets/images/earrings_1.jpg': 2
  };

  currentIndex = 0;

   relatedImages: string[] = [];

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
      this.loadRelatedImages(categoryId);   // 🔥 Notify parent
    }
  }

   loadRelatedImages(categoryId: number) {
    this.http.get<any[]>(`http://localhost:3000/products/category/${categoryId}`)
      .subscribe(res => {
        this.relatedImages = res.map(p => p.image_url); // ONLY IMAGES
      });
  }
}
