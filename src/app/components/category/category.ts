
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './category.html',
  styleUrls: ['./category.css']
})
export class category implements OnInit {
  @Output() categorySelected = new EventEmitter<number | null>();

  categories: any[] = [];
  loading = true;
  errorMessage = '';
  selectedCategoryId: number | null = null;

   private baseUrl1 = 'https://ecom-backend-production-c71b.up.railway.app/api/Categories/with-products/all';
   private baseUrl ='https://ecom-backend-production-c71b.up.railway.app';

  constructor(private http: HttpClient, private router: Router) {}
    ngOnInit(): void {
    this.http.get<any[]>(this.baseUrl1).subscribe({
      next: (data) => {
        // Add a flag to track image load status
        this.categories = (Array.isArray(data) ? data : []).map(cat => ({
          ...cat,
          imageLoaded: true
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
        this.errorMessage = 'Failed to load categories.';
        this.loading = false;
      }
    });
  }

  trackByCategoryId(index: number, item: any) {
  return item?.category_id ?? item?.id ?? index;
}



 selectCategory(category: any) {
  const id = Number(category?.category_id);

  this.router.navigate(['/products', id]);
}
  

clearSelection() {
  this.router.navigate(['/products']);
}



  getImageUrl(img?: string): string {
    const raw = (img ?? '').replace(/^\/*/, '').trim();
    const encoded = encodeURIComponent(raw);
    return `https://ecom-backend-production-c71b.up.railway.app/assets/images/${encoded}`;
  }

  // onImageError(ev: Event) { 
  //   (ev.target as HTMLImageElement).src = 
  //     `https://ecom-backend-production-c71b.up.railway.app/assets/images/placeholder.png`; 
  // }
   onImageError(category: any) {
    category.imageLoaded = false; // Switch to MP4 fallback
  }

   fallbackVideo = '../../../assets/videos/Lines Circular Loader 1.mp4';
}