import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(private _HttpClient:HttpClient) { }

  getSingleCategory(id:number):Observable<any>{
    return this._HttpClient.get(`https://api.escuelajs.co/api/v1/categories/${id}`);
  }
  
}
