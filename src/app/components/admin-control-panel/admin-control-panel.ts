
import { Component, OnInit } from '@angular/core';
import { CategoryService, ProductService } from './services/admin.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

type ProductImageKey =
  | 'image_url'
  | 'image_url1'
  | 'image_url2'
  | 'image_url3'
  | 'image_url4';

@Component({
  selector: 'app-admin-control-panel',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-control-panel.html',
  styleUrls: ['./admin-control-panel.css'],
})
export class AdminControlPanelComponent implements OnInit {
  activeSection: 'categories' | 'products' = 'categories';

  categories: any[] = [];
  categoryName = '';
  categoryImage: File | null = null;
  editingCategory: any = null;

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

  imageKeys: ProductImageKey[] = [
    'image_url',
    'image_url1',
    'image_url2',
    'image_url3',
    'image_url4'
  ];

  editingProduct: any = null;
  loading = false;
  errorMessage = '';
constructor(private catSvc: CategoryService, private prodSvc: ProductService,private router:Router) {}

  ngOnInit(): void {
  this.loadCategories();
  this.loadProducts();

  window.history.pushState(null, '', window.location.href);
  window.addEventListener('popstate', () => {
    window.history.pushState(null, '', window.location.href);
  });
}


  getPreview(key: ProductImageKey): string | undefined {
    return this.productImagePreviews[key];
  }

  loadCategories() {
    this.catSvc.getAll().subscribe({
      next: (res) => this.categories = res || [],
      error: (err) => console.error(err)
    });
  }

  onCategoryFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.categoryImage = input.files?.[0] || null;
  }

  createCategory() {
    if (!this.categoryName.trim()) {
      this.errorMessage = 'Category name is required';
      return;
    }

    const fd = new FormData();
    fd.append("name", this.categoryName.trim());

    if (this.categoryImage) {
      fd.append("image_url", this.categoryImage);
    }

    this.catSvc.createCategory(fd).subscribe({
      next: () => {
        this.categoryName = "";
        this.categoryImage = null;
        this.loadCategories();
      },
      error: (err) => {
        console.error("CATEGORY CREATE ERROR:", err);
      }
    });
  }

  editCategory(cat: any) {
    this.editingCategory = { ...cat };
    this.categoryImage = null;
  }

  updateCategory() {
    const fd = new FormData();
    fd.append('name', this.editingCategory.name);

    if (this.categoryImage)
      fd.append('image_url', this.categoryImage);

    this.catSvc.updateCategory(this.editingCategory.category_id, fd).subscribe({
      next: () => {
        this.editingCategory = null;
        this.categoryImage = null;
        this.loadCategories();
      }
    });
  }

  cancelEditCategory() {
    this.editingCategory = null;
  }

  deleteCategory(id: number) {
    this.catSvc.deleteCategory(id).subscribe({
      next: () => this.loadCategories()
    });
  }

  loadProducts() {
    this.prodSvc.getAll().subscribe({
      next: (res) => this.products = res || [],
      error: (err) => console.error(err)
    });
  }

  onProductFileChange(event: Event, key: ProductImageKey) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;

    this.productImages[key] = file;

    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.productImagePreviews[key] = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  createProduct() {
    const fd = new FormData();
    fd.append('name', this.productForm.name);
    fd.append('description', this.productForm.description);
    fd.append('price', String(this.productForm.price));
    fd.append('stock_quantity', String(this.productForm.stock_quantity));
    fd.append('category_id', String(this.productForm.category_id));

    this.imageKeys.forEach(key => {
      if (this.productImages[key]) fd.append(key, this.productImages[key] as File);
    });

    this.prodSvc.createProduct(fd).subscribe({
      next: () => {
        this.resetProductForm();
        this.loadProducts();
      }
    });
  }

  editProduct(p: any) {
    this.editingProduct = { ...p };
    this.resetProductImages();
  }

  updateProduct() {
    const fd = new FormData();
    fd.append('name', this.editingProduct.name);
    fd.append('description', this.editingProduct.description);
    fd.append('price', String(this.editingProduct.price));
    fd.append('stock_quantity', String(this.editingProduct.stock_quantity));
    fd.append('category_id', String(this.editingProduct.category_id));

    this.imageKeys.forEach(key => {
      if (this.productImages[key]) fd.append(key, this.productImages[key] as File);
    });

    this.prodSvc.updateProduct(this.editingProduct.product_id, fd).subscribe({
      next: () => {
        this.editingProduct = null;
        this.resetProductForm();
        this.loadProducts();
      }
    });
  }

  cancelEditProduct() {
    this.editingProduct = null;
    this.resetProductForm();
  }

  deleteProduct(id: number) {
    this.prodSvc.deleteProduct(id).subscribe({
      next: () => this.loadProducts()
    });
  }

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
    this.imageKeys.forEach(key => this.productImages[key] = null);
    this.productImagePreviews = {};
  }
 onLog() {
  localStorage.removeItem("adminToken");
  this.router.navigate(['/']);
  history.pushState(null, '', location.href);
}

}
