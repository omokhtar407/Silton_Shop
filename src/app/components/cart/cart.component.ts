import { Component, OnInit } from '@angular/core';
import { CartServicesService } from './../../services/cart-services.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products:any[]= [];
  grandTotal:number = 0;

  constructor(private _CartService:CartServicesService) { }

  removeProduct(pro:any){
    this._CartService.removeCartItem(pro)
  }

  removeAllProducts(){
    this._CartService.removeAllCartItems()
  }


  ngOnInit(): void {
    this._CartService.getProducts().subscribe(
      (res)=>{
        this.products = res;
        this.grandTotal = this._CartService.getTotalPrice();
      },
      (error)=>{
        console.log("Error: " + error)
      }
    )
  }

}
