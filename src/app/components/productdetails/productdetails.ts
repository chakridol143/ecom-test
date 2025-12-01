
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product-list/services/product.service';
import { CartService } from '../cart/services/cart.services';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productdetails.html',
  styleUrls: ['./productdetails.css']
})
export class Productdetails implements OnInit {

   @Input() product: any = null;
  @Output() close = new EventEmitter<void>();
  loading = false;
  error: string | null = null;

  imgBase = "https://ecom-backend-production-5341.up.railway.app/assets/images/";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

 ngOnInit() {
    // window.scrollTo({ top: 0, behavior: "smooth" });
  const allowed = sessionStorage.getItem("fromProducts");
  sessionStorage.removeItem("fromProducts");

  if (!allowed) {
    this.router.navigate(['menu']);
    return;
  }
  this.route.paramMap.subscribe(params => {
    const id = Number(params.get("id"));
    if (!id || id <= 0) {
      this.router.navigate(['menu']);
      return;
    }

    this.loadProduct(id);
  });
}


  loadProduct(id: number) {
    this.loading = true;

    this.productService.getById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
      },
      error: () => {
        this.router.navigate(['menu']);
      }
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  closeOnOutsideClick() {
    this.router.navigate(['menu']);
  }

  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/placeholder.png';
  }
   closeDetails() {
    this.close.emit();
  }
}