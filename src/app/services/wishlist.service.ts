import { sweetAlertError, sweetAlertSuccess } from 'src/sweetalert';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product1 } from 'src/model/product';
@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  wishlistItems: Product1[] = [];
  productList = new BehaviorSubject<any>([]);

  constructor(private _Router: Router) {
    if (localStorage.getItem('wishlistHeart') != null) {
      this.wishlistItems =
        JSON.parse(localStorage.getItem('wishlistHeart') as any) || [];
      this.productList.next(this.wishlistItems);
    }
  }

  getProducts(): Observable<any> {
    return this.productList;
  }

  setProduct(...pro: any) {
    this.wishlistItems.push(...pro);
    this.productList.next(pro);
  }

  addToWishlist(pro: any) {
    if (localStorage.getItem('userToken') != null) {
      
      if(this.wishlistItems.length){
        let checkPro = this.wishlistItems.findIndex(pr => pr.id === pro.id) > -1;
          if(checkPro){
            sweetAlertError('Product Already Exist in Wishlist');
          }
          else{
            this.wishlistItems.push(pro);
            sweetAlertSuccess('Product Added to Wishlist');
          }
      }
      else{
        this.wishlistItems.push(pro);
        sweetAlertSuccess('Product Added to Wishlist');
      }

      localStorage.setItem('wishlistHeart', JSON.stringify(this.wishlistItems));
      this.productList.next(this.wishlistItems);

    } else {
      this._Router.navigate(['login']);
    }
  }

  removeItemFromWish(pro: Product1) {
    this.wishlistItems.map((pr: Product1, index: number) => {
      if (pro.id === pr.id) {
        this.wishlistItems.splice(index, 1);
        localStorage.setItem(
          'wishlistHeart',
          JSON.stringify(this.wishlistItems)
        );
      }
    });
    this.productList.next(this.wishlistItems);
    sweetAlertSuccess('Product Removed from Wishlist');
  }
}
