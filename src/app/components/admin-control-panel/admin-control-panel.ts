// src/app/components/admin-control-panel/admin-control-panel.component.ts
import { Component, OnInit } from '@angular/core';
import { CategoryService, ProductService } from './services/admin.services';
import { HttpErrorResponse } from '@angular/common/http';

type ProductImageKey = 'image_url' | 'image_url1' | 'image_url2' | 'image_url3' | 'image_url4';

@Component({
  selector: 'app-admin-control-panel',
  templateUrl: './admin-control-panel.html',
  styleUrls: ['./admin-control-panel.css']
})
export class AdminControlPanelComponent implements OnInit {
  // CATEGORY
  categories: any[] = [];
  categoryName = '';
  categoryImage: File | null = null;
  editingCategory: any = null;

  // PRODUCT
  products: any[] = [];
  productForm: any = {
    name: '',
    description: '',
    price: '',
    stock_quantity: '',
    category_id: ''
  };

  productImages: Record<ProductImageKey, File | null> = {
    image_url: null,
    image_url1: null,
    image_url2: null,
    image_url3: null,
    image_url4: null
  };

  productImagePreviews: Partial<Record<ProductImageKey, string>> = {};

  editingProduct: any = null;

  loading = false;
  errorMessage = '';

  constructor(
    private catSvc: CategoryService,
    private prodSvc: ProductService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  // CATEGORIES 
  loadCategories() {
    this.catSvc.getAll().subscribe({
      next: (res) => (this.categories = res || []),
      error: (err: HttpErrorResponse) => console.error('Load categories error', err)
    });
  }

  onCategoryFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.categoryImage = input.files && input.files[0] ? input.files[0] : null;
  }

  createCategory() {
    if (!this.categoryName.trim()) {
      this.errorMessage = 'Category name is required';
      return;
    }
    const fd = new FormData();
    fd.append('name', this.categoryName.trim());
    if (this.categoryImage) fd.append('image', this.categoryImage);
    this.loading = true;
    this.catSvc.createCategory(fd).subscribe({
      next: () => {
        this.loading = false;
        this.categoryName = '';
        this.categoryImage = null;
        this.loadCategories();
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Error creating category';
        console.error(err);
      }
    });
  }

  editCategory(cat: any) {
    this.editingCategory = { ...cat };
    this.categoryImage = null;
  }

  updateCategory() {
    if (!this.editingCategory) return;
    const fd = new FormData();
    fd.append('name', String(this.editingCategory.name || '').trim());
    if (this.categoryImage) fd.append('image', this.categoryImage);
    this.catSvc.updateCategory(this.editingCategory.category_id, fd).subscribe({
      next: () => {
        this.editingCategory = null;
        this.categoryImage = null;
        this.loadCategories();
      },
      error: (err) => {
        console.error('Update category error', err);
      }
    });
  }

  cancelEditCategory() {
    this.editingCategory = null;
    this.categoryImage = null;
  }

  deleteCategory(id: number) {
    if (!confirm('Delete category?')) return;
    this.catSvc.deleteCategory(id).subscribe({
      next: () => this.loadCategories(),
      error: (err) => console.error('Delete category error', err)
    });
  }

  // ---------------- PRODUCTS ----------------
  loadProducts() {
    this.prodSvc.getAll().subscribe({
      next: (res) => (this.products = res || []),
      error: (err) => console.error('Load products error', err)
    });
  }

  onProductFileChange(event: Event, field: ProductImageKey) {
    const input = event.target as HTMLInputElement;
    if (!input || !input.files || input.files.length === 0) {
      this.productImages[field] = null;
      delete this.productImagePreviews[field];
      return;
    }
    const file = input.files[0];
    this.productImages[field] = file;

    // create preview
    const reader = new FileReader();
    reader.onload = () => {
      this.productImagePreviews[field] = String(reader.result);
    };
    reader.readAsDataURL(file);
  }

  createProduct() {
    if (!this.productForm.name || !String(this.productForm.name).trim()) {
      this.errorMessage = 'Product name required';
      return;
    }
    const fd = new FormData();
    fd.append('name', String(this.productForm.name));
    if (this.productForm.description) fd.append('description', String(this.productForm.description));
    if (this.productForm.price !== undefined) fd.append('price', String(this.productForm.price));
    if (this.productForm.stock_quantity !== undefined) fd.append('stock_quantity', String(this.productForm.stock_quantity));
    if (this.productForm.category_id) fd.append('category_id', String(this.productForm.category_id));

    // append image fields using exact backend keys
    (Object.keys(this.productImages) as ProductImageKey[]).forEach((k) => {
      const file = this.productImages[k];
      if (file) fd.append(k, file);
    });

    this.prodSvc.createProduct(fd).subscribe({
      next: () => {
        this.resetProductForm();
        this.loadProducts();
      },
      error: (err) => {
        console.error('Create product error', err);
      }
    });
  }

  editProduct(p: any) {
    this.editingProduct = { ...p };
    this.resetProductImages();
  }

  updateProduct() {
    if (!this.editingProduct) return;
    const fd = new FormData();
    // include editable fields
    fd.append('name', String(this.editingProduct.name || ''));
    fd.append('description', String(this.editingProduct.description || ''));
    fd.append('price', String(this.editingProduct.price ?? '0'));
    fd.append('stock_quantity', String(this.editingProduct.stock_quantity ?? '0'));
    if (this.editingProduct.category_id) fd.append('category_id', String(this.editingProduct.category_id));

    // files
    (Object.keys(this.productImages) as ProductImageKey[]).forEach((k) => {
      const file = this.productImages[k];
      if (file) fd.append(k, file);
    });

    this.prodSvc.updateProduct(this.editingProduct.product_id, fd).subscribe({
      next: () => {
        this.editingProduct = null;
        this.resetProductForm();
        this.loadProducts();
      },
      error: (err) => {
        console.error('Update product error', err);
      }
    });
  }

  cancelEditProduct() {
    this.editingProduct = null;
    this.resetProductForm();
  }

  deleteProduct(id: number) {
    if (!confirm('Delete product?')) return;
    this.prodSvc.deleteProduct(id).subscribe({
      next: () => this.loadProducts(),
      error: (err) => console.error('Delete product error', err)
    });
  }

  // ---------------- HELPERS ----------------
  resetProductForm() {
    this.productForm = {
      name: '',
      description: '',
      price: '',
      stock_quantity: '',
      category_id: ''
    };
    this.resetProductImages();
  }

  resetProductImages() {
    (Object.keys(this.productImages) as ProductImageKey[]).forEach(k => this.productImages[k] = null);
    this.productImagePreviews = {};
  }
}
