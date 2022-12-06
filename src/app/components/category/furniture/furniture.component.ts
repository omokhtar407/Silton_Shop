import { Product } from 'src/model/product';
import { sweetAlertError } from 'src/sweetalert';
import { ActivatedRoute } from '@angular/router';
import { WishlistService } from '../../../services/wishlist.service';
import { CartServicesService } from '../../../services/cart-services.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-furniture',
  templateUrl: './furniture.component.html',
  styleUrls: ['./furniture.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FurnitureComponent implements OnInit {
  furnitureProducts: Product[] = [];
  constructor(
    private _CartServices: CartServicesService,
    private _WishlistService: WishlistService,
    private _ActivatedRoute: ActivatedRoute,
    private _NgxSpinnerService: NgxSpinnerService
  ) {}

  addToCart(pro: Product) {
    this._CartServices.addToCart(pro);
  }

  addToWishlist(pro: Product, event: any) {
    let heart = event.target;
    heart.classList.add('heart_active');
    this._WishlistService.addToWishlist(pro);
  }

  ngOnInit(): void {
    this._NgxSpinnerService.show();
    this._ActivatedRoute.data.subscribe((response: any) => {
      setTimeout(()=>{
        this._NgxSpinnerService.hide();
      },2000);
      if (response.products != `No data`) {
        // Get furnitureProducts
        this.furnitureProducts = response.products
          .slice(0, 100)
          .filter((pro: Product) => {
            return pro.category.name == 'Furniture';
          });
        this.furnitureProducts.forEach((pro: Product) => {
          Object.assign(pro, { quantity: 1, total: pro.price });
        });
        // End
      } else {
        sweetAlertError('No Furniture Available Now');
      }
    });
  }
}
