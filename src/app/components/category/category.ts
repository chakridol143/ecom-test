
// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HttpClient, HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-category',
//   standalone: true,
//   imports: [CommonModule, HttpClientModule, ],
//   templateUrl: './category.html',
//   styleUrls: ['./category.css']
// })
// export class category implements OnInit {
//   @Output() categorySelected = new EventEmitter<number | null>();
//   categories: any[] = [];
//   loading = true;
//   errorMessage = '';
//   @Input() items: any[] = [];
//   @Output() close = new EventEmitter<void>();
//   @Output() remove = new EventEmitter<number>();
//   @Output() clear = new EventEmitter<void>();
//   private lastSelectedId: number | null = null;
//   // private baseUrl = 'http://localhost:3000/api/categories/with-products/all';
//    private baseUrl = 'https://ecom-backend-production-5341.up.railway.app/api/categories/with-products/all';
//   constructor(private http: HttpClient) {}
//   ngOnInit(): void {
//     this.http.get<any[]>(this.baseUrl).subscribe({
//       next: (data) => {
//         this.categories = Array.isArray(data) ? data : [];
//         this.loading = false;
//       },
//       error: (err) => {
//         console.error('Error fetching categories:', err);
//         this.errorMessage = 'Failed to load categories.';
//         this.loading = false;
//       }
//     });
//   }
// onSelect(categoryId: number | null) {
//     if (this.lastSelectedId === categoryId) return;
//     this.lastSelectedId = categoryId;
//     this.categorySelected.emit(categoryId);
//   }
//   imgUrl(img?: string): string {
//     const raw = (img ?? '').replace(/^\/*/, '').trim();
//     const encoded = encodeURIComponent(raw);
//     // return `http://localhost:3000/assets/images/${encoded}`;
//      return `https://ecom-backend-production-5341.up.railway.app/assets/images/${encoded}`;
//   }
//   onImgError(ev: Event) {
//     (ev.target as HTMLImageElement).src = 'https://ecom-backend-production-5341.up.railway.app/assets/images/placeholder.png';
//   }
//   trackByCategoryId(index: number, item: any) {
//   return item?.category_id ?? item?.id ?? index;
// }
//   clearSelection() {
//     this.lastSelectedId = null;
//     this.categorySelected.emit(null);
//   }
// }

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
  @Input() items: any[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() remove = new EventEmitter<number>();
  @Output() clear = new EventEmitter<void>();
  private lastSelectedId: number | null = null;
  // private baseUrl = 'http://localhost:3001/api/categories/with-products/all';
   private baseUrl = 'https://ecom-backend-production-5341.up.railway.app/api/categories/with-products/all';
  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    this.http.get<any[]>(this.baseUrl).subscribe({
      next: (data) => {
        this.categories = Array.isArray(data) ? data : [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
        this.errorMessage = 'Failed to load categories.';
        this.loading = false;
      }
    });
  }
onSelect(categoryId: number | null) {
    if (this.lastSelectedId === categoryId) return;
    this.lastSelectedId = categoryId;
    this.categorySelected.emit(categoryId);
  }
  imgUrl(img?: string): string {
    const raw = (img ?? '').replace(/^\/*/, '').trim();
    const encoded = encodeURIComponent(raw);
    // return http://localhost:3001/assets/images/${encoded};
     return `https//ecom-backend-production-5341.up.railway.app/assets/images/${encoded}`;
  }
  onImgError(ev: Event) {
    (ev.target as HTMLImageElement).src = 'https://ecom-backend-production-5341.up.railway.app/assets/images/placeholder.png';
  }
  trackByCategoryId(index: number, item: any) {
  return item?.category_id ?? item?.id ?? index;
}
  // clearSelection() {
  //   this.lastSelectedId = null;
  //   this.categorySelected.emit(null);
  // }

  selectedCategoryId: number | null = null;
  selectedCategory: any = null;

  // selectCategory(category: any) {
  //   if (!category) return;
  //   const id = Number(category?.category_id ?? category?.id);
  //   if (Number.isFinite(this.selectedCategoryId) && this.selectedCategoryId === id) return;

  //   this.selectedCategory = category;
  //   this.selectedCategoryId = Number.isFinite(id) ? id : null;
  // } 

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
    return `https://ecom-backend-production-5341.up.railway.app/assets/images/${encoded}`;
  }

  onImageError(ev: Event) { 
    (ev.target as HTMLImageElement).src = 
      'https://ecom-backend-production-5341.up.railway.app/assets/images/placeholder.png'; 
  }
}