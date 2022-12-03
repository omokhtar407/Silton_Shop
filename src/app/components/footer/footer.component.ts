import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  Year: number = 0;
  constructor() { }

  sweetAlert(text:string){
    Swal.fire({
      title: 'Success',
      text: text,
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }


  submitForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  SubmitForm(submitForm: FormGroup) {
    
    if (submitForm.valid) {
      localStorage.setItem('userSubmit', submitForm.value.email);
    }
  }
  ngOnInit(): void {
    this.Year = new Date().getFullYear();
  }

}
