import { sweetAlertSuccess } from 'src/sweetalert';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  Year: number = 0;
  constructor() {}

  submitForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  SubmitForm(submitForm: FormGroup) {
    if (submitForm.valid) {
      localStorage.setItem('userSubmit', submitForm.value.email);
      sweetAlertSuccess('Thanks for Your Subscription');
    }
  }
  ngOnInit(): void {
    this.Year = new Date().getFullYear();
  }
}
