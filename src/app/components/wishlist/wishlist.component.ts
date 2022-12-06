import { CartServicesService } from './../../services/cart-services.service';
import { WishlistService } from './../../services/wishlist.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/model/product';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  products: Product[] = [];
  wishlistHeart: Product[] = [];
  constructor(
    private _WishlistService: WishlistService,
    private _CartServices: CartServicesService,
    private _NgxSpinnerService: NgxSpinnerService
  ) {}

  addToCart(pro: Product) {
    this._CartServices.addToCart(pro);
  }

  removeProduct(pro: Product) {
    this._WishlistService.removeItemFromWish(pro);
  }

  ngOnInit(): void {
    this._NgxSpinnerService.show();
    this._WishlistService.getProducts().subscribe(
      (res) => {
        setTimeout(()=>{
          this._NgxSpinnerService.hide();
        },2000)
        this.products = res;
      },
      (error) => {
        console.log('Error: ' + error);
      }
    );
  }
}
