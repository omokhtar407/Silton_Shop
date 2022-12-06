import { Component, OnInit } from '@angular/core';
import { Product } from 'src/model/product';
import { CartServicesService } from './../../services/cart-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products:Product[]= [];
  grandTotal:number = 0;

  constructor(private _CartService:CartServicesService,private _NgxSpinnerService: NgxSpinnerService) { }

  removeProduct(pro:Product){
    this._CartService.removeCartItem(pro)
  }

  removeAllProducts(){
    this._CartService.removeAllCartItems()
  }


  ngOnInit(): void {
    this._NgxSpinnerService.show();
    this._CartService.getProducts().subscribe(
      (res)=>{
        setTimeout(()=>{
          this._NgxSpinnerService.hide();
        },2000);

        this.products = res;
        this.grandTotal = this._CartService.getTotalPrice();
      },
      (error)=>{
        console.log("Error: " + error)
      }
    )
  }

}
