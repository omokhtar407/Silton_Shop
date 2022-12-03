import { ActivatedRoute } from '@angular/router';
import { WishlistService } from '../../../services/wishlist.service';
import { CartServicesService } from '../../../services/cart-services.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ClothesComponent implements OnInit {
  clothesProducts: any[] = [];
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
      // Get clothesProducts
      this.clothesProducts = response.products.slice(0, 100).filter((pro: any) => {
        return pro.category.name == 'Clothes';
      });
      this.clothesProducts.forEach((pro: any) => {
        Object.assign(pro, { quantity: 1, total: pro.price });
      });
      // End
    });
  }
}
