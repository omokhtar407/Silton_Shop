import { sweetAlertError } from 'src/sweetalert';
import { ActivatedRoute } from '@angular/router';
import { WishlistService } from '../../../services/wishlist.service';
import { CartServicesService } from '../../../services/cart-services.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Product1 } from 'src/model/product';

@Component({
  selector: 'app-jewelery',
  templateUrl: './jewelery.component.html',
  styleUrls: ['./jewelery.component.css']
})
export class JeweleryComponent implements OnInit {

  jewelery: Product1[] = [];
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

        // Get jewelery
          this.jewelery = response.products
            .filter((pro: Product1) => {
              return pro.category == `jewelery`;
            });
        // End
      } else {
        sweetAlertError('No jewelery Available Now');
      }
    });
  }
}
