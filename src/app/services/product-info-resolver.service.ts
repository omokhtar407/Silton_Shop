import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ShopServicesService } from './shop-services.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductInfoResolverService {

  productId:number = 0;
  constructor(private _ShopServices:ShopServicesService,private _ActivatedRoute: ActivatedRoute) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<Observable<any>> | Promise<Observable<any>> {

    console.log('Called Get Product in resolver...', route);

    this.productId = route.params.id;

    return this._ShopServices.getSingleProduct(this.productId).pipe(
      catchError(error => {
        return of('No data');
      })
    );


  }
}
