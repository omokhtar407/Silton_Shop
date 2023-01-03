import { sweetAlertError } from 'src/sweetalert';
import { ActivatedRoute } from '@angular/router';
import { WishlistService } from './../../services/wishlist.service';
import { CartServicesService } from './../../services/cart-services.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from 'src/model/product';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  trendingProducts: Product[] = [];
  bestSellerProducts: Product[] = [];

  constructor(
    private _WishlistService: WishlistService,
    private _CartServices: CartServicesService,
    private _ActivatedRoute: ActivatedRoute,
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

  addToCart(pro: Product) {
    this._CartServices.addToCart(pro);
  }

  addToWishlist(pro: Product, event: any) {
    let heart = event.target;
    heart.classList.add('heart_active');
    this._WishlistService.addToWishlist(pro);
  }

  ngOnInit(): void {
    this._ActivatedRoute.data.subscribe((response: any) => {
      if (response.products != `No data`) {
        // Trending Products
        this.trendingProducts = response.products
          .slice(0, 25)
          .filter((pro: Product) => {
            return pro.category.name != 'Others';
          });
        this.trendingProducts.forEach((pro: Product) => {
          Object.assign(pro, { quantity: 1, total: pro.price }); // add two properties to product
        });
        // End
        // BestSeller Products
        this.bestSellerProducts = response.products
          .slice(25, 45)
          .filter((pro: Product) => {
            return pro.category.name != 'Others';
        });
        this.bestSellerProducts.forEach((pro: Product) => {
          Object.assign(pro, { quantity: 1, total: pro.price });
        });
        // End
      } else {
        sweetAlertError('No Products Available Now');
      }
    });
  }
}
