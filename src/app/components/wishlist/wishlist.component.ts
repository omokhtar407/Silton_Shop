import { CartServicesService } from './../../services/cart-services.service';
import { WishlistService } from './../../services/wishlist.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  products:any[]= [];
  wishlistHeart:any[]= [];
  constructor(private _WishlistService:WishlistService, private _CartServices:CartServicesService) { }

  addToCart(pro:any){
    this._CartServices.addToCart(pro);
  }

  removeProduct(pro:any){
    this._WishlistService.removeItemFromWish(pro)
  }


  ngOnInit(): void {
    this._WishlistService.getProducts().subscribe(
      (res)=>{
        this.products = res;
      },
      (error)=>{
        console.log("Error: " + error)
      }
    )
  }


}
