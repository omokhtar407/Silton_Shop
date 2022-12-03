import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class CartServicesService {
  cartItemList: any[] = [];
  productList = new BehaviorSubject<any>([]);

  constructor(private _Router:Router){
    if(localStorage.getItem('cart') != null) {
      this.cartItemList = JSON.parse(localStorage.getItem('cart') as any) || []
      this.productList.next(this.cartItemList)
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

  setProduct(pro:any){
    this.cartItemList.push(...pro);
    this.productList.next(pro);
  }

  /* for plus quantity */
  // addToCart(pro:any){

  //   if(this.cartItemList.length){


  //       let x = this.cartItemList.findIndex(element => element.id === pro.id) > -1;
  //         console.log(x)

  //       if(x){
  //         pro.quantity += 1
  //         console.log("ok" , pro.quantity)
  //       }
  //       else{
  //         this.cartItemList.push(pro);
  //         console.log("error")
  //       }

  //       // this.cartItemList.forEach(pr =>{
  //       //   if(pr.id === pro.id){
  //       //     pr.quantity += 1;
  //       //   }
  //       //   else if(pr.id === pro.id){
  //       //     this.cartItemList.push(pro);
  //       //   }
  //       // })
  //       // this.cartItemList.push(pro);
  //     }
  //     else{
  //       this.cartItemList.push(pro);
  //     }

  //   console.log("final",this.cartItemList)
  //   localStorage.setItem('cart',JSON.stringify(this.cartItemList));
  //   this.productList.next(this.cartItemList);
  //   this.getTotalPrice();
  //   this.sweetAlert('Product Added to Cart');
  //   // console.log(this.cartItemList)
  // }

  addToCart(...pro:any){


    if(localStorage.getItem('userToken') != null) {
      this.cartItemList.push(...pro);
      localStorage.setItem('cart',JSON.stringify(this.cartItemList));
      this.productList.next(this.cartItemList);
      this.getTotalPrice();
      this.sweetAlert('Product Added to Cart');
    }
    else{
      this._Router.navigate(['login']);
    }
  }

  getTotalPrice():number{
    let grandTotal = 0;
    this.cartItemList.map((pro:any)=>{
      grandTotal += pro.total
    })

    return grandTotal;
  }

  removeCartItem(pro:any){

    this.cartItemList.map((pr:any , index :any)=>{
      if(pro.id === pr.id){
        this.cartItemList.splice(index , 1);
        localStorage.setItem('cart',JSON.stringify(this.cartItemList));
      }
    })
    this.productList.next(this.cartItemList);
    this.sweetAlert('Product Removed from Cart');
  }

  removeAllCartItems(){
    this.cartItemList =[];
    localStorage.setItem('cart',JSON.stringify(this.cartItemList));
    this.productList.next(this.cartItemList);
    this.sweetAlert('All Products Removed from Cart');
  }
}
