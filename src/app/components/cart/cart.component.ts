import { Component, OnInit } from '@angular/core';
import { Product1 } from 'src/model/product';
import { CartServicesService } from './../../services/cart-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { sweetAlertSuccess } from 'src/sweetalert';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: Product1[] = [];
  grandTotal: number = 0;

  constructor(
    private _CartService: CartServicesService,
    private _NgxSpinnerService: NgxSpinnerService
  ) {}

  removeProduct(pro: Product1) {
    this._CartService.removeCartItem(pro);
  }

  removeAllProducts() {
    this._CartService.removeAllCartItems();
  }

  plusProduct(pro_id: any) {
    this.products[pro_id].quantity++;
    this.getTotalPri();
    localStorage.setItem('cart', JSON.stringify(this.products));
  }
  minsProduct(pro_id: any) {
    this.products[pro_id].quantity--;
    this.getTotalPri();
    localStorage.setItem('cart', JSON.stringify(this.products));
  }
  detectProQ() {
    this.getTotalPri();
    localStorage.setItem('cart', JSON.stringify(this.products));
  }

  getTotalPri() {
    this.grandTotal = this._CartService.getTotalPrice();
  }

  addCart() {
    let products = this.products.map((pro: Product1) => {
      return {
        productId: pro.id,
        quantity: pro.quantity,
      };
    });
    let model = {
      userId: 5,
      date: new Date(),
      products: products,
    };

    this._CartService.addNewCart(model).subscribe((res: any) => {
      if(res){
        sweetAlertSuccess('Well Done! your order is Successfully send');
      }
    });
  }
  ngOnInit(): void {
    this._NgxSpinnerService.show();
    this._CartService.getProducts().subscribe(
      (res) => {
        setTimeout(() => {
          this._NgxSpinnerService.hide();
        }, 2000);
        this.products = res;
        this.getTotalPri();
      },
      (error) => {
        console.log('Error: ' + error);
      }
    );
  }
}
