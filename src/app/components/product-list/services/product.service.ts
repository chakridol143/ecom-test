
import { environment } from '../../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = `${environment.apiUrl}/api/products`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.baseUrl);
  }

  getById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  
  getProductsByCategory(categoryId: number) {
  return this.http.get<any[]>(`${environment.apiUrl}/api/products/category/${categoryId}`);
}

}


