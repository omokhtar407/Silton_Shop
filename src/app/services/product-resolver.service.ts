import { sweetAlertError } from 'src/sweetalert';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductResolverService implements Resolve<Observable<any>> {
  productsUrl: string = `https://api.escuelajs.co/api/v1/products/`;
  constructor(private _HttpClient: HttpClient) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Observable<Observable<any>> | Promise<Observable<any>> {
    // console.log('Called Get Product in resolver...', route);

    return this._HttpClient.get(this.productsUrl).pipe(
      catchError((error) => {
        sweetAlertError("No Data Found");
        return of('No data');
      })
    );
  }
}
