
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product-list/services/product.service';
import { CartService } from '../cart-details/services/cart.services';

interface Product {
  product_id: number;
  name: string;
  price: number;
  category_id: number;
  image_url: string;
  image_url1?: string;
  image_url2?: string;
  image_url3?: string;
  image_url4?: string;
  images?: string[];
  currentImage?: string;
}

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productdetails.html',
  styleUrls: ['./productdetails.css']
})
export class Productdetails implements OnInit {

  product: any = null;
  relatedProducts: any[] = [];
  recentlyViewed: any[] = [];
  quantity = 1;
   openSection: string | null = 'shipping';
  activeIndex = 0;
  

finishes = ['24k Gold Plated', '18k Gold Plated', 'Rose Gold', 'Silver Plated'];
  selectedFinish = '24k Gold Plated';

  baseImg = 'https://ecom-backend-production-c71b.up.railway.app/assets/images/';

  

  @ViewChild('recentScroll', { static: false })
recentScroll!: ElementRef;

@ViewChild('suggestedScroll', { static: false })
suggestedScroll!: ElementRef;

  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.recentlyViewed = this.cartService.getRecentlyViewed();

    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) this.loadProduct(id);
    });
  }

  
   loadProduct(id: number) {
    this.productService.getById(id).subscribe((data: any) => {
      
      this.product = data;

      this.cartService.addRecentlyViewed(data);
      this.recentlyViewed = this.cartService.getRecentlyViewed();

      this.product.images = [
        data.image_url,
        data.image_url1,
        data.image_url2,
        data.image_url3,
        data.image_url4
      ].filter(Boolean).map(img => this.baseImg + img);

      this.activeIndex = 0;
      this.loadRelatedProducts(data.category_id, data.product_id);
    });
  }
  
get filteredRecentlyViewed(): any[] {
  if (!this.product) return [];

  const list = this.recentlyViewed.filter(
    item => item.product_id !== this.product.product_id
  );

  return list.length >= 1 ? list : [];
}

  loadRelatedProducts(categoryId: number, currentProductId: number) {
    this.productService.getProductsByCategory(categoryId).subscribe(products => {
      this.relatedProducts = products
        .filter(p => p.product_id !== currentProductId)
        .map(p => ({
          ...p,
          currentImage: this.baseImg + (p.image_url || p.image_url1 || '')
        }));
    });
  }

  get suggestedProducts(): any[] {
    const recentIds = new Set(this.recentlyViewed.map(p => p.product_id));
    const related = this.relatedProducts.filter(p => !recentIds.has(p.product_id));
    return [...this.recentlyViewed, ...related];
  }

  get images(): string[] {
  return this.product?.images ?? [];
}


  incQty() {
    this.quantity++;
  }

  decQty() {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart() {
    if (!this.product) return;

    this.cartService.addToCart({
      product_id: this.product.product_id,
      name: this.product.name,
      price: this.product.price,
      image_url: this.product.image_url,
      quantity: this.quantity
    });
  }

  toggle(section: string) {
    this.openSection = this.openSection === section ? null : section;
  }

  openProductDetails(id: number) {
    this.router.navigate(['/product', id]);
  }

  onHoverImage(item: any) {
    if (item.image_url1) {
      item.currentImage = this.baseImg + item.image_url1;
    }
  }

  onLeaveImage(item: any) {
    item.currentImage = this.baseImg + (item.image_url || '');
  }

  scrollRecent(dir: 'left' | 'right') {
  this.recentScroll.nativeElement.scrollBy({
    left: dir === 'left' ? -320 : 320,
    behavior: 'smooth'
  });
}

scrollSuggested(dir: 'left' | 'right') {
  this.suggestedScroll.nativeElement.scrollBy({
    left: dir === 'left' ? -320 : 320,
    behavior: 'smooth'
  });
}

}

   