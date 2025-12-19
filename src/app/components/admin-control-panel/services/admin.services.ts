import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

function getAuthHeadersObj(): { headers: HttpHeaders } {
  const token =
    localStorage.getItem("adminToken") ||     
    localStorage.getItem("admin_token") ||
    localStorage.getItem("token");

  return {
    headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
  };
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'https://ecom-backend-production-c71b.up.railway.app/api/admin/categories';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl, getAuthHeadersObj());
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, getAuthHeadersObj());
  }

  createCategory(data: FormData | object): Observable<any> {
    return this.http.post(this.apiUrl, data, getAuthHeadersObj());
  }

  updateCategory(id: number, data: FormData | object): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, getAuthHeadersObj());
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, getAuthHeadersObj());
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://ecom-backend-production-c71b.up.railway.app/api/admin/products';


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

  updateProduct(id: number, data: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, getAuthHeadersObj());
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, getAuthHeadersObj());
  }

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
    fd.append('description', payload.description ?? '');
    fd.append('price', String(payload.price ?? 0));
    fd.append('stock_quantity', String(payload.stock_quantity ?? 0));
    fd.append('category_id', String(payload.category_id ?? ''));

    if (payload.image_url) fd.append('image_url', payload.image_url);
    if (payload.image_url1) fd.append('image_url1', payload.image_url1);
    if (payload.image_url2) fd.append('image_url2', payload.image_url2);
    if (payload.image_url3) fd.append('image_url3', payload.image_url3);
    if (payload.image_url4) fd.append('image_url4', payload.image_url4);

    return fd;
  }
}
