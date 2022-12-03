import { WishlistService } from './../../services/wishlist.service';
import { AuthService } from './../../services/auth.service';
import { CartServicesService } from './../../services/cart-services.service';
import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  totalCartPro:number = 0;
  totalWishlistPro:number = 0;
  isLogin: boolean = false;
  isToggle: boolean = false;

  constructor( private _CartService:CartServicesService,private _WishlistService:WishlistService ,private _AuthService:AuthService) {}


  addCollapse() {
    $('button').next('.collapse').slideToggle(300);
    this.isToggle = true;
  }

  removeCollapse() {
    $('.collapse').fadeOut(300);
    this.isToggle = false;
  }

  changeWebsiteToRed(){
    const body = document.querySelector('body')
    body?.classList.remove('blue');
    body?.classList.remove('orange');
  }
  changeWebsiteToBlue(){
    const body = document.querySelector('body')
    body?.classList.add('blue');
    body?.classList.remove('red');
    body?.classList.remove('orange');
  }
  changeWebsiteToOrange(){
    const body = document.querySelector('body')
    body?.classList.add('orange');
    body?.classList.remove('red');
    body?.classList.remove('blue');
  }

  logOut() {
    this._AuthService.logout();
  }

  ngOnInit(): void {
    this._AuthService.userData.subscribe(() => {
      if (this._AuthService.userData.getValue() != null) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });

    this._CartService.getProducts().subscribe(
      (res)=>{
        this.totalCartPro = res.length;
      },
      (error)=>{
        console.log("Error: " + error)
      }
    );

    this._WishlistService.getProducts().subscribe(
      (res)=>{
        this.totalWishlistPro = res.length;
      },
      (error)=>{
        console.log("Error: " + error)
      }
    );
  }

}
