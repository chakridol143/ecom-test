import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
export interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export interface Category {
  category_id: number;
  name: string;
  description?: string;
  image_url?: string;
  products?: Product[];
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `https://ecom-backend-production-5341.up.railway.app/api/categories`;

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}`);
  }

  getCategoryById(categoryId: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${categoryId}`);
  }

  getCategoriesWithProducts(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/with-products/all`);
  }

  getProductsByCategory(categoryId: number) {
    return this.http.get<any[]>(
      `${this.apiUrl}/${categoryId}/products`
    );
  }
}
