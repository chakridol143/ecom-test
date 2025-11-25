

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductService {
  // private baseUrl = 'http://127.0.0.1:3000/products';
    private baseUrl = 'https://ecom-backend-production-5341.up.railway.app/api/products';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.baseUrl);
  }

  getById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  
  getProductsByCategory(categoryId: number) {
  // return this.http.get<any[]>(`http://localhost:3000/api/products/category/${categoryId}`);
  return this.http.get<any[]>(`https://ecom-backend-production-5341.up.railway.app/api/products/category/${categoryId}`);
}

}


