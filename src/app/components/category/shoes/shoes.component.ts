import { ActivatedRoute } from '@angular/router';
import { WishlistService } from '../../../services/wishlist.service';
import { CartServicesService } from '../../../services/cart-services.service';
import { ShopServicesService } from '../../../services/shop-services.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-shoes',
  templateUrl: './shoes.component.html',
  styleUrls: ['./shoes.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ShoesComponent implements OnInit {
  shoesProducts: any[] = [];
  constructor(
    private _CartServices: CartServicesService,
    private _WishlistService: WishlistService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  addToCart(pro: any) {
    this._CartServices.addToCart(pro);
  }

  addToWishlist(pro: any, event: any) {
    let heart = event.target;
    heart.classList.add('heart_active');
    this._WishlistService.addToWishlist(pro);
  }

  ngOnInit(): void {

    this._ActivatedRoute.data.subscribe((response: any) => {
      // Get shoesProducts
      this.shoesProducts = response.products.slice(0, 100).filter((pro: any) => {
        return pro.category.name == 'Shoes';
      });
      this.shoesProducts.forEach((pro: any) => {
        Object.assign(pro, { quantity: 1, total: pro.price });
      });
      // End
    });
  }
}
