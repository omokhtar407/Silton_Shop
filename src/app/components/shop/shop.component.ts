import { sweetAlertError } from 'src/sweetalert';
import { ActivatedRoute } from '@angular/router';
import { WishlistService } from './../../services/wishlist.service';
import { CartServicesService } from './../../services/cart-services.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Product1 } from 'src/model/product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ShopComponent implements OnInit {
  Products: Product1[] = [];
  constructor(
    private _CartServices: CartServicesService,
    private _WishlistService: WishlistService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  addToCart(pro: Product1) {
    this._CartServices.addToCart(pro);
  }

  addToWishlist(pro: Product1, event: any) {
    let heart = event.target;
    heart.classList.add('heart_active');
    this._WishlistService.addToWishlist(pro);
  }

  ngOnInit(): void {
    this._ActivatedRoute.data.subscribe((response: any) => {
      if (response.products != `No data`) {

        response.products.forEach((pro: Product1) => {
          Object.assign(pro, { quantity: 1, total: pro.price });
        });

        // Get Products
          this.Products = response.products.slice(0);
        // End
      } else {
        sweetAlertError('No Products Available Now');
      }
    });
  }
}
