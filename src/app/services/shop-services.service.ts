import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopServicesService {

  constructor(private _HttpClient:HttpClient) { }

  getAllProducts():Observable<any>{
    return  this._HttpClient.get(`https://api.escuelajs.co/api/v1/products`);
  }

  getSingleProduct(id:number):Observable<any>{
    return this._HttpClient.get(`https://api.escuelajs.co/api/v1/products/${id}`);
  }
}
