import { HttpClient } from '@angular/common/http';
import { sweetAlertError, sweetAlertSuccess } from 'src/sweetalert';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product1 } from 'src/model/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartServicesService {
  cartItemList: Product1[] = [];
  productList = new BehaviorSubject<any>([]);

  constructor(private _Router: Router,private _http:HttpClient) {
    if (localStorage.getItem('cart') != null) {
      this.cartItemList = JSON.parse(localStorage.getItem('cart') as any) || [];
      this.productList.next(this.cartItemList);
    }
  }

  getProducts(): Observable<any> {
    return this.productList;
  }

  setProduct(pro: Product1) {
    this.cartItemList.push(pro);
    this.productList.next(pro);
  }

  addToCart(pro:any){
    if (localStorage.getItem('userToken') != null) {
      if(this.cartItemList.length){
        // let x = this.cartItemList.findIndex(pr => pr.id === pro.id) > -1; another technic
        let proExist = this.cartItemList.find(pr => pr.id === pro.id);

          if(proExist){
            sweetAlertError('Product Already Exist in Cart');
          }
          else{
            this.cartItemList.push(pro);
            sweetAlertSuccess('Product Added to Cart');
          }
      }
      else{
        this.cartItemList.push(pro);
        sweetAlertSuccess('Product Added to Cart');
      }
      localStorage.setItem('cart',JSON.stringify(this.cartItemList));
      this.productList.next(this.cartItemList);
      this.getTotalPrice();

    }
    else{
      this._Router.navigate(['login']);
    }
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((pro: Product1) => {
      grandTotal += pro.total * pro.quantity;
    });

    return grandTotal;
  }

  removeCartItem(pro: Product1) {
    this.cartItemList.map((pr: Product1, index: number) => {
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

  addNewCart(payload:any){
    return this._http.post(environment.baseUrl.replace(`products`,`carts`),payload)
  }
}
