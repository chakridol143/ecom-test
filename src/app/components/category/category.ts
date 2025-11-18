
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ],
  templateUrl: './category.html',
  styleUrls: ['./category.css']
})
export class CategoryComponent implements OnInit {
  @Output() categorySelected = new EventEmitter<number | null>();
  categories: any[] = [];
  loading = true;
  errorMessage = '';
  @Input() items: any[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() remove = new EventEmitter<number>();
  @Output() clear = new EventEmitter<void>();
  private lastSelectedId: number | null = null;
  private baseUrl = 'https://ecom-backend-production-5341.up.railway.app/api/categories/with-products/all';
  constructor(private http: HttpClient) {}
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
    return `https://ecom-backend-production-5341.up.railway.app/assets/images/${encoded}`;
  }
  onImgError(ev: Event) {
    (ev.target as HTMLImageElement).src = 'https://ecom-backend-production-5341.up.railway.app/assets/images/placeholder.png';
  }
  trackByCategoryId(index: number, item: any) {
  return item?.category_id ?? item?.id ?? index;
}
  clearSelection() {
    this.lastSelectedId = null;
    this.categorySelected.emit(null);
  }
}