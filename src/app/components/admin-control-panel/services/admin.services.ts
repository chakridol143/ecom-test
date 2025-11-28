
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

function getAuthHeadersObj(): { headers: HttpHeaders } {
  const token = localStorage.getItem('adminToken') || '';
  return {
    headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
  };
}


 //CategoryService 
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // private apiUrl = 'http://localhost:3000/api/categories';
   private apiUrl = 'https://ecom-backend-production-5341.up.railway.app/api/categories';


  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

 
  createCategory(data: FormData | object): Observable<any> {
    if (data instanceof FormData) {
      return this.http.post(this.apiUrl, data, getAuthHeadersObj());
    }
    return this.http.post(this.apiUrl, data, getAuthHeadersObj());
  }

  updateCategory(id: number, data: FormData | object): Observable<any> {
    if (data instanceof FormData) {
      return this.http.put(`${this.apiUrl}/${id}`, data, getAuthHeadersObj());
    }
    return this.http.put(`${this.apiUrl}/${id}`, data, getAuthHeadersObj());
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, getAuthHeadersObj());
  }

  getCategoriesWithProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/with-products`);
  }

  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${categoryId}/products`);
  }

  // Helper
  buildFormData(name: string, imageFile?: File): FormData {
    const fd = new FormData();
    fd.append('name', name);
    if (imageFile) fd.append('image_url', imageFile);
    return fd;
  }
}

//ProductService

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // private apiUrl = 'http://localhost:3000/api/products';
     private apiUrl = 'https://ecom-backend-production-5341.up.railway.app/api/products';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl, getAuthHeadersObj());
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, getAuthHeadersObj());
  }

  createProduct(data: FormData): Observable<any> {
    return this.http.post(this.apiUrl, data, getAuthHeadersObj());
  }

 
  updateProduct(id: number, data: FormData | object): Observable<any> {
    if (data instanceof FormData) {
      return this.http.put(`${this.apiUrl}/${id}`, data, getAuthHeadersObj());
    }
    return this.http.put(`${this.apiUrl}/${id}`, data, getAuthHeadersObj());
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, getAuthHeadersObj());
  }

  // Helper
  buildProductFormData(payload: {
    name: string;
    description?: string;
    price?: number | string;
    stock_quantity?: number | string;
    category_id?: number | string;
    image_url?: File | null;
    image_url1?: File | null;
    image_url2?: File | null;
    image_url3?: File | null;
    image_url4?: File | null;
  }): FormData {
    const fd = new FormData();
    fd.append('name', payload.name);
    if (payload.description) fd.append('description', String(payload.description));
    if (payload.price !== undefined) fd.append('price', String(payload.price));
    if (payload.stock_quantity !== undefined) fd.append('stock_quantity', String(payload.stock_quantity));
    if (payload.category_id !== undefined) fd.append('category_id', String(payload.category_id));
    if (payload.image_url) fd.append('image', payload.image_url);
    if (payload.image_url1) fd.append('image1', payload.image_url1);
    if (payload.image_url2) fd.append('image2', payload.image_url2);
    if (payload.image_url3) fd.append('image3', payload.image_url3);
    if (payload.image_url4) fd.append('image4', payload.image_url4);
    return fd;
  }
}
