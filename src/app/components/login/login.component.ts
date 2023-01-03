import { sweetAlertSuccess, sweetAlertError } from 'src/sweetalert';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router
  ) {
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  login(loginForm: FormGroup) {
    this._AuthService.login(loginForm.value).subscribe(
      (res) => {
        if (loginForm.valid) {
          localStorage.setItem('userToken', res.access_token);
          this._AuthService.saveUserData();
          this.loginForm.reset();
          sweetAlertSuccess('Successfully Login');
          this._Router.navigate(['home']);
        }
      },
      (error) => {
        sweetAlertError('Check email or password');
      }
    );
  }

  ngOnInit(): void {
  }
}
