import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-qa-login',
  templateUrl: './qa-login.component.html',
  styleUrls: ['./qa-login.component.css']
})
export class QaLoginComponent {
  date : Number = new Date().getFullYear();

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  })

  constructor(private router: Router){}

  onClick(){
    if (this.loginForm.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Enter the correct login details',
        icon: 'error',
        confirmButtonText: 'Okay'
      })
    } else if(this.loginForm.get('username')?.value != 'admin' || this.loginForm.get('password')?.value != 'admin') {
      Swal.fire({
        title: 'Error!',
        text: 'Enter the correct login details',
        icon: 'error',
        confirmButtonText: 'Okay'
      })
      
    } else if(this.loginForm.get('username')?.value === 'admin' && this.loginForm.get('password')?.value === 'admin'){
      Swal.fire({
        title: 'Success!',
        text: 'Admin logged in successfully',
        icon: 'success',
        confirmButtonText: 'Done'
      });

      this.router.navigate(['/auth/qa-admin'])
    }
  }
}
