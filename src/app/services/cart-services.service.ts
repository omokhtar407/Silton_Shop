import { sweetAlertSuccess } from 'src/sweetalert';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/model/product';

@Injectable({
  providedIn: 'root',
})
export class CartServicesService {
  cartItemList: Product[] = [];
  productList = new BehaviorSubject<any>([]);

  constructor(private _Router: Router) {
    if (localStorage.getItem('cart') != null) {
      this.cartItemList = JSON.parse(localStorage.getItem('cart') as any) || [];
      this.productList.next(this.cartItemList);
    }
  }

  getProducts(): Observable<any> {
    return this.productList;
  }

  setProduct(pro: Product) {
    this.cartItemList.push(pro);
    this.productList.next(pro);
  }

  addToCart(pro:any){
    if (localStorage.getItem('userToken') != null) {
      if(this.cartItemList.length){

          let x = this.cartItemList.findIndex(pr => pr.id === pro.id) > -1;

          if(x){
            pro.quantity += 1
          }
          else{
            this.cartItemList.push(pro);
          }
      }
      else{
        this.cartItemList.push(pro);
      }
      localStorage.setItem('cart',JSON.stringify(this.cartItemList));
      this.productList.next(this.cartItemList);
      this.getTotalPrice();
      sweetAlertSuccess('Product Added to Cart');
    }
    else{
      this._Router.navigate(['login']);
    }
  }

  // addToCart(...pro: any) {
  //   if (localStorage.getItem('userToken') != null) {
  //     this.cartItemList.push(...pro);
  //     localStorage.setItem('cart', JSON.stringify(this.cartItemList));
  //     this.productList.next(this.cartItemList);
  //     this.getTotalPrice();
  //     sweetAlertSuccess('Product Added to Cart');
  //   } else {
  //     this._Router.navigate(['login']);
  //   }
  // }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((pro: Product) => {
      grandTotal += pro.total;
    });

    return grandTotal;
  }

  removeCartItem(pro: Product) {
    this.cartItemList.map((pr: Product, index: number) => {
      if (pro.id === pr.id) {
        this.cartItemList.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(this.cartItemList));
      }
    });
    this.productList.next(this.cartItemList);
    sweetAlertSuccess('Product Removed from Cart');
  }

  removeAllCartItems() {
    this.cartItemList = [];
    localStorage.setItem('cart', JSON.stringify(this.cartItemList));
    this.productList.next(this.cartItemList);
    sweetAlertSuccess('All Products Removed from Cart');
  }
}
