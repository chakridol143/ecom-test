// // src/app/product-details/product-details.component.ts
// import { CommonModule, NgFor } from '@angular/common';
// import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';

// import { HttpClientModule } from '@angular/common/http';
// import { ProductList } from '../product-list/product-list';
// import { ProductService } from '../product-list/services/product.service';
// import { CartService } from '../cart/services/cart.services';



// @Component({
//   selector: 'app-product-details',
//   standalone: true,
//   imports: [CommonModule, HttpClientModule, NgFor],
//   templateUrl: './productdetails.html',
//   styleUrls: ['./productdetails.css']
// })
// export class Productdetails implements OnInit {   // ✅ Fixed class name

//   product: any = null;
//   relatedProducts: any[] = [];
//   activeIndex = 0;
//   quantity = 1;
//    @Output() addToCartEvent = new EventEmitter<any>();
//   private baseImg = 'https://ecom-backend-production-c71b.up.railway.app/assets/images/';

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private productService: ProductService,
//     private cart :CartService
//   ) {}

//   ngOnInit() {
//     this.route.paramMap.subscribe(params => {
//       const id = Number(params.get('id'));
//       if (id) this.loadProduct(id);
//     });
//   }

//   loadProduct(id: number) {
//     this.productService.getById(id).subscribe({
//       next: (data: any) => {
//         this.product = data;

//         // Map all images
//         this.product.images = [
//           data.image_url,
//           data.image_url1,
//           data.image_url2,
//           data.image_url3,
//           data.image_url4
//         ].filter(Boolean).map(img => this.baseImg + img);

//         this.activeIndex = 0;

//         // Load related products
//         this.loadRelatedProducts(data.category_id, data.product_id);
//       },
//       error: (err: any) => console.error('Product load failed', err)
//     });
//   }

//   // loadRelatedProducts(categoryId: number, currentProductId: number) {
//   //   this.productService.getProductsByCategory(categoryId).subscribe({
//   //     next: (products: any[]) => {
//   //       this.relatedProducts = products
//   //         .filter((p: any) => p.product_id !== currentProductId)
//   //         .slice(0, 4);
          
//   //     },
//   //     error: (err: any) => console.error('Related products load failed', err)
//   //   });
//   // }

//   loadRelatedProducts(categoryId: number, currentProductId: number) {
//   this.productService.getProductsByCategory(categoryId).subscribe({
//     next: (products: any[]) => {
//       this.relatedProducts = products
//         .filter((p: any) => p.product_id !== currentProductId)
//         .slice(0, 4)
//         .map(p => ({
//           ...p,
//           currentImage: this.baseImg + ( p.image_url || p.image_url1 || '')
//         }));
//     },
//     error: (err: any) => console.error('Related products load failed', err)
//   });
// }


//   setActive(index: number) { this.activeIndex = index; }
//   // incQty() { this.quantity++; }
//   // decQty() { if (this.quantity > 1) this.quantity--; }

//   openProduct(product: any) {
//     this.router.navigate(['/product', product.product_id]);
//   }

//   getImage(img: string) {
//     return this.baseImg + img;
//   }

//   // ✅ Add getter for template usage
//   get images(): string[] {
//     return this.product?.images ?? [];
//   }

//   // inside ProductDetailsComponent
// openProductDetails(productId: number) {
//   // Navigate to the same product details page with the new product id
//   this.router.navigate(['/product', productId]).then(() => {
//     // Reload the product after navigation
//     this.loadProduct(productId);
//   });
// }


// getRelatedImage(item: any): string {
//   return this.baseImg + (item.image_url || item.image_url1 || '');
// }

//  onHoverImage(item: any) {
//   if (item.image_url1) {
//     item.currentImage = this.baseImg + item.image_url1; // show second image on hover
//   }
// }

// onLeaveImage(item: any) {
//   item.currentImage = this.baseImg + (item.image_url || '') // revert to main image
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
// // addtoCart(product: any) {
// //     console.log('Adding to cart:', product);
// //     this.addToCartEvent.emit(product);
// //     this.cart.addToCart(product);
// //   }

// addToCart(product:any) {
//   // if (!this.product) return;

//   const cartItem = {
//     product_id: this.product.product_id,
//     name: this.product.name,
//     price: this.product.price,
//     image_url: this.product.image_url,
//     quantity: this.quantity
//   };
//   this.addToCartEvent.emit(product);
//   this.cart.addToCart(cartItem);
//   // this.cart.addToCart(product);
// }
//   incQty() {
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
//   const cartItem = this.cart.getItems().find(i => i.product_id === this.product.product_id);
//   if (cartItem) {
//     // Update existing item quantity in cart in real-time
//     this.cart.updateQuantity(this.product.product_id, this.quantity);
//   }
// }

// }

// src/app/product-details/product-details.component.ts
import { CommonModule, NgFor } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductList } from '../product-list/product-list';
import { ProductService } from '../product-list/services/product.service';
import { CartService } from '../cart/services/cart.services';

import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NgFor, FormsModule],
  templateUrl: './productdetails.html',
  styleUrls: ['./productdetails.css']
})
export class Productdetails implements OnInit {   // ✅ Fixed class name

  product: any = null;
  relatedProducts: any[] = [];
  activeIndex = 0;
  quantity = 1;
  openSection: string | null = 'shipping';
  

  private baseImg = 'https://ecom-backend-production-c71b.up.railway.app/assets/images/';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService ,
    private cartService : CartService

    // ✅ Injected ProductService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) this.loadProduct(id);
    });
  }

  loadProduct(id: number) {
    this.productService.getById(id).subscribe({
      next: (data: any) => {
        this.product = data;

        // Map all images
        this.product.images = [
          data.image_url,
          data.image_url1,
          data.image_url2,
          data.image_url3,
          data.image_url4
        ].filter(Boolean).map(img => this.baseImg + img);

        this.activeIndex = 0;

        // Load related products
        this.loadRelatedProducts(data.category_id, data.product_id);
      },
      error: (err: any) => console.error('Product load failed', err)
    });
  }

 

  loadRelatedProducts(categoryId: number, currentProductId: number) {
  this.productService.getProductsByCategory(categoryId).subscribe({
    next: (products: any[]) => {
      this.relatedProducts = products
        .filter((p: any) => p.product_id !== currentProductId)
        .map(p => ({
          ...p,
          currentImage: this.baseImg + ( p.image_url || p.image_url1 || '')
        }));
    },
    error: (err: any) => console.error('Related products load failed', err)
  });
}


  setActive(index: number) { this.activeIndex = index; }
 


  openProduct(product: any) {
    this.router.navigate(['/product', product.product_id]);
  }

  getImage(img: string) {
    return this.baseImg + img;
  }

  // ✅ Add getter for template usage
  get images(): string[] {
    return this.product?.images ?? [];
  }

  // inside ProductDetailsComponent
openProductDetails(productId: number) {
  // Navigate to the same product details page with the new product id
  this.router.navigate(['/product', productId]).then(() => {
    // Reload the product after navigation
    this.loadProduct(productId);
  });
}


getRelatedImage(item: any): string {
  return this.baseImg + (item.image_url || item.image_url1 || '');
}

 onHoverImage(item: any) {
  if (item.image_url1) {
    item.currentImage = this.baseImg + item.image_url1; // show second image on hover
  }
}

onLeaveImage(item: any) {
  item.currentImage = this.baseImg + (item.image_url || '') // revert to main image
}



  onImgError(evt: Event) {
    (evt.target as HTMLImageElement).src = 'assets/placeholder.png';
  }

  goToProduct(productId: number) {
  this.router.navigate(['/product', productId]);
}

onScroll(event: any) {
  const media = event.target;
  if (media.scrollLeft > 20) {
    media.classList.add('scrolled');
  } else {
    media.classList.remove('scrolled');
  }
}
finishes: string[] = [
    '24k Gold Plated',
    '18k Gold Plated',
    'Rose Gold',
    'Silver Plated'
  ];

selectedFinish = '24k Gold Plated';
  addToCart() {
  if (!this.product) return;

  const cartItem = {
    product_id: this.product.product_id,
    name: this.product.name,
    price: this.product.price,
    image_url: this.product.image_url,
    quantity: this.quantity
  };

  this.cartService.addToCart(cartItem);
}

incQty() {
  this.quantity++;
  this.syncQuantityWithCart();
}

   decQty() {
  if (this.quantity > 1) {
    this.quantity--;
    this.syncQuantityWithCart();
  }
}

 private syncQuantityWithCart() {
  if (!this.product) return;
  const cartItem = this.cartService.getItems().find(i => i.product_id === this.product.product_id);
  if (cartItem) {
    // Update existing item quantity in cart in real-time
    this.cartService.updateQuantity(this.product.product_id, this.quantity);
  }
}


  toggle(section: string) {
    this.openSection = this.openSection === section ? null : section;
  }
}