import { ShopServicesService } from './shop-services.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements  Resolve<Observable<any>> {

  constructor(private _ShopServices:ShopServicesService){

    }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<Observable<any>> | Promise<Observable<any>> {

    console.log('Called Get Product in resolver...', route);

    return this._ShopServices.getAllProducts().pipe(
      catchError(error => {
        return of('No data');
      })
    );


  }
}
