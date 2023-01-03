import { sweetAlertSuccess, sweetAlertError } from 'src/sweetalert';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
  ) {}

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    avatar: new FormControl(null, [Validators.required]),
  });

  register(registerForm: FormGroup) {
    this._AuthService.register(registerForm.value).subscribe(
      (res) => {
        if (registerForm.valid) {
          this.registerForm.reset();
          sweetAlertSuccess('Successfully Registration');
          this._Router.navigate(['login']);
        }
      },
      (error) => {
        console.log(error);
        sweetAlertError(error.error.message);
      }
    );
  }

  ngOnInit(): void {
  }
}
