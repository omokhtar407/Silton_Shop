import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData = new BehaviorSubject(null);

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('userToken') != null) {
      this.saveUserData();
    }
  }

  saveUserData() {
    let encodedUserData = JSON.stringify(localStorage.getItem('userToken'));
    this.userData.next(jwtDecode(encodedUserData));
  }

  register(formData: object): Observable<any> {
    return this._HttpClient.post(
      `https://api.escuelajs.co/api/v1/users/`,
      formData
    );
  }

  login(formData: object): Observable<any> {
    return this._HttpClient.post(
      `https://api.escuelajs.co/api/v1/auth/login`,
      formData
    );
  }

  logout() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['login']);
  }
}
