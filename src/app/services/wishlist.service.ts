import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  wishlistItems: any[] = [];
  productList = new BehaviorSubject<any>([]);

  constructor(private _Router:Router){
    if(localStorage.getItem('wishlistHeart') != null) {
      this.wishlistItems = JSON.parse(localStorage.getItem('wishlistHeart') as any) || []
      this.productList.next(this.wishlistItems)
    }
  }

  sweetAlert(text:string){
    Swal.fire({
      title: 'Success',
      text: text,
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }

  getProducts():Observable<any>{
    return this.productList
  }

  setProduct(...pro:any){
    this.wishlistItems.push(...pro);
    this.productList.next(pro);
  }

  addToWishlist(...pro:any){
    if(localStorage.getItem('userToken') != null) {
      this.wishlistItems.push(...pro);
      localStorage.setItem('wishlistHeart',JSON.stringify(this.wishlistItems));
      this.productList.next(this.wishlistItems);
      this.sweetAlert('Product Added to Wishlist');
    }
    else{
      this._Router.navigate(['login']);
    }
  }


  removeItemFromWish(pro:any){
    this.wishlistItems.map((pr:any , index :any)=>{
      if(pro.id === pr.id){
        this.wishlistItems.splice(index , 1);
        localStorage.setItem('wishlistHeart',JSON.stringify(this.wishlistItems));
      }
    })
    this.productList.next(this.wishlistItems);
    this.sweetAlert('Product Removed from Wishlist');

  }

}
