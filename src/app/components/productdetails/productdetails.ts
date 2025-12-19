// import { CommonModule, NgFor } from '@angular/common';
// import { Component, NgModule, OnInit, viewChild } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';
// import { ProductService } from '../product-list/services/product.service';
// import { FormsModule } from '@angular/forms';
// import { ViewChild,ElementRef } from '@angular/core';
// import { CartService } from '../cart-details/services/cart.services';


// @Component({
//   selector: 'app-product-details',
//   standalone: true,
//   imports: [CommonModule, HttpClientModule, NgFor, FormsModule],
//   templateUrl: './productdetails.html',
//   styleUrls: ['./productdetails.css']
// })
// export class Productdetails implements OnInit {  

//   product: any = null;
//   relatedProducts: any[] = [];
//   recentlyViewed : any[] = [];
//   activeIndex = 0;
//   quantity = 1;
//   openSection: string | null = 'shipping';
//   @ViewChild('relatedScroll', { static: false })
//   relatedScroll!: ElementRef;


//   private baseImg = 'https://ecom-backend-production-c71b.up.railway.app/assets/images/';

    
//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private productService: ProductService ,
//     private cartService : CartService,
    
//   ) {}

//   ngOnInit() {
//      this.cartService.getRecentlyViewed().subscribe(items => {
//     this.recentlyViewed = items;
//   });
//     this.route.paramMap.subscribe(params => {
//       const id = Number(params.get('id'));
//       if (id) this.loadProduct(id);
//     });
//   }
// loadProduct(id: number) {
//   this.productService.getById(id).subscribe({
//     next: (data: any) => {
//       this.product = data;

//       // 🔥 SAVE RECENTLY VIEWED PRODUCT
//       this.cartService.addRecentlyViewed(data);

//       // this.recentlyViewed = this.cartService.getCartByUserId();
//       // Map all images
//       this.product.images = [
//         data.image_url,
//         data.image_url1,
//         data.image_url2,
//         data.image_url3,
//         data.image_url4
//       ]
//         .filter(Boolean)
//         .map(img => this.baseImg + img);

//       this.activeIndex = 0;

//       this.loadRelatedProducts(
//         data.category_id,
//         data.product_id
//       );
//     },
//     error: (err: any) =>
//       console.error('Product load failed', err)
//   });
// }

//  loadRelatedProducts(categoryId: number, currentProductId: number) {
//   this.productService.getProductsByCategory(categoryId).subscribe({
//     next: (products: any[]) => {
//       this.relatedProducts = products
//         .filter(p => p.product_id !== currentProductId)
//         .map(p => ({
//           ...p,
//           currentImage: this.baseImg + (p.image_url || p.image_url1 || '')
//         }));
//     },
//     error: err => console.error('Related products load failed', err)
//   });
// }

//   setActive(index: number) { this.activeIndex = index; }

//   openProduct(product: any) {
//     this.router.navigate(['/product', product.product_id]);
//   }

//   getImage(img: string) {
//     return this.baseImg + img;
//   }

//   get images(): string[] {
//     return this.product?.images ?? [];
//   }

// openProductDetails(productId: number) {
//   this.router.navigate(['/product', productId]).then(() => {
//     this.loadProduct(productId);
//   });
// }


// getRelatedImage(item: any): string {
//   return this.baseImg + (item.image_url || item.image_url1 || '');
// }

//  onHoverImage(item: any) {
//   if (item.image_url1) {
//     item.currentImage = this.baseImg + item.image_url1; 
//   }
// }

// onLeaveImage(item: any) {
//   item.currentImage = this.baseImg + (item.image_url || '') 
// }



//   onImgError(evt: Event) {
//     (evt.target as HTMLImageElement).src = 'assets/placeholder.png';
//   }

//   goToProduct(productId: number) {
//   this.router.navigate(['/product', productId]);
// }

// onScroll(event: any) {
//   const media = event.target;
//   if (media.scrollLeft > 20) {
//     media.classList.add('scrolled');
//   } else {
//     media.classList.remove('scrolled');
//   }
// }
// finishes: string[] = [
//     '24k Gold Plated',
//     '18k Gold Plated',
//     'Rose Gold',
//     'Silver Plated'
//   ];

// selectedFinish = '24k Gold Plated';
//   addToCart() {
//   if (!this.product) return;

//   const cartItem = {
//     product_id: this.product.product_id,
//     name: this.product.name,
//     price: this.product.price,
//     image_url: this.product.image_url,
//     quantity: this.quantity
//   };

//   this.cartService.addToCart(cartItem);
// }

// incQty() {
//   this.quantity++;
//   this.syncQuantityWithCart();
// }

//    decQty() {
//   if (this.quantity > 1) {
//     this.quantity--;
//     this.syncQuantityWithCart();
//   }
// }

//  private syncQuantityWithCart() {
//   if (!this.product) return;
//   const cartItem = this.cartService.getItems().find(i => i.product_id === this.product.product_id);
//   if (cartItem) {
//     this.cartService.updateQuantity(this.product.product_id, this.quantity);
//   }
// }


//   toggle(section: string) {
//     this.openSection = this.openSection === section ? null : section;
//   }

// scrollRelated(direction: 'left' | 'right') {
//   const scrollAmount = 320;

//   this.relatedScroll.nativeElement.scrollBy({
//     left: direction === 'left' ? -scrollAmount : scrollAmount,
//     behavior: 'smooth'
//   });
// }

// }
import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
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
  imports: [CommonModule, HttpClientModule, NgFor, FormsModule],
  templateUrl: './productdetails.html',
  styleUrls: ['./productdetails.css']
})
export class Productdetails implements OnInit {

  product: any = null;
  relatedProducts: any[] = [];
  recentlyViewed: any[] = [];

  quantity = 1;
  activeIndex = 0;
  openSection: string | null = 'shipping';

  finishes = ['24k Gold Plated', '18k Gold Plated', 'Rose Gold', 'Silver Plated'];
  selectedFinish = '24k Gold Plated';

  baseImg = 'https://ecom-backend-production-c71b.up.railway.app/assets/images/';

  @ViewChild('relatedScroll', { static: false })
  relatedScroll!: ElementRef;

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

  // loadProduct(id: number) {
  //   this.productService.getById(id).subscribe((data: Product) => {
      
  //     this.product = data;

  //     this.cartService.addRecentlyViewed(data);
  //     this.recentlyViewed = this.cartService.getRecentlyViewed();

  //     this.product.images = [
  //       data.image_url,
  //       data.image_url1,
  //       data.image_url2,
  //       data.image_url3,
  //       data.image_url4
  //     ].filter(Boolean).map(img => this.baseImg + img);

  //     this.activeIndex = 0;
  //     this.loadRelatedProducts(data.category_id, data.product_id);
  //   });
  // }
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

  onImgError(evt: Event) {
    (evt.target as HTMLImageElement).src = 'assets/placeholder.png';
  }

  scrollRelated(dir: 'left' | 'right') {
    this.relatedScroll.nativeElement.scrollBy({
      left: dir === 'left' ? -320 : 320,
      behavior: 'smooth'
    });
  }

  get images(): string[] {
    return this.product?.images || [];
  }
}
