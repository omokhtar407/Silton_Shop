import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { sweetAlertError } from 'src/sweetalert';

@Injectable({
  providedIn: 'root',
})
export class ProductInfoResolverService {
  singProductUrl: string = `https://api.escuelajs.co/api/v1/products/`;
  productId: number = 0;
  constructor(
    private _HttpClient: HttpClient,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Observable<Observable<any>> | Promise<Observable<any>> {
    // console.log('Called Get Product in resolver...', route);

    this.productId = route.params.id;

    return this._HttpClient.get(this.singProductUrl + this.productId).pipe(
      catchError((error) => {
        sweetAlertError("No Data Found")
        return of('No data');
      })
    );
  }
}
