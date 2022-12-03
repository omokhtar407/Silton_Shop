import { WishlistService } from './../../services/wishlist.service';
import { CartServicesService } from './../../services/cart-services.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css'],
})
export class ProductInfoComponent implements OnInit {
  productId: number = 0;
  product: any = {};
  products: any[] = [];

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _WishlistService: WishlistService,
    private _CartService: CartServicesService
  ) {}

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    nav: true,
    navText: [
      '<i class="fas fa-angle-left" style="font-size:25px; font-style:italic;" ></i>',
      '<i class="fas fa-angle-right" style="font-size:25px; font-style:italic;"></i>',
    ],
    margin: 10,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 4,
      },
    },
  };

  getProduct() {
    this._ActivatedRoute.data.subscribe((response: any) => {
      this.product = response.product;
        Object.assign(this.product, { quantity: 1, total: this.product.price });
        this.getRelatedProducts(this.product.category.name)
    });
  }

  getRelatedProducts(cateName:any) {

    this._ActivatedRoute.data.subscribe((response: any) => {
      this.products = response.products.slice(0, 25).filter((pro: any) => {
        return pro.category.name === cateName;
      });

      this.products.forEach((pro: any) => {
        Object.assign(pro, { quantity: 1, total: pro.price });
      });
    });
  }

  addToCart(pro: any) {
    this._CartService.addToCart(pro);
  }

  //this function For product button
  addToWishlist(pro: any) {
    this._WishlistService.addToWishlist(pro);
  }

  // this function for related products
  addToWishlist2(pro: any, event: any) {
    let heart = event.target;
    heart.classList.add('heart_active');
    this._WishlistService.addToWishlist(pro);
  }

  ngOnInit(): void {
    this.getProduct();
  }
}
