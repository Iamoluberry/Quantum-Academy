import { Component } from '@angular/core';
import { complaintTypes } from '../complaints';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiHandlerService } from '../api-service/api-handler.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  complaints = complaintTypes;
  date : Number = new Date().getFullYear();
  loading: boolean = false;

  complaintForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(1)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(1)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]),
    reasonForComplaint: new FormControl('', [Validators.required]),
    textAreaDetails: new FormControl('', [Validators.required, Validators.minLength(1)]),
  })
  

  constructor(private apiHandler: ApiHandlerService){}

  postComplaints(data: any){
    this.apiHandler.postComplaintsApi(data).subscribe
  }

  onSubmit(data: any) {
    this.loading = true;
    if (this.complaintForm.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Enter the right details',
        icon: 'error',
        confirmButtonText: 'Okay'
      })
      this.loading = false;
    } else {
      
      this.apiHandler.postComplaintsApi(data).subscribe({
        next: (response) => {
          console.log(response);
          Swal.fire({
            title: 'Success!',
            text: 'Submitted successfully',
            icon: 'success',
            confirmButtonText: 'Done'
          });
          this.complaintForm.reset();  // to reset newform
          this.loading = false;
        },
        error: (err) => console.log(err),
      })
    }
}

}
