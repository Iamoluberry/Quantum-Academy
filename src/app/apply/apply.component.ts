import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryApiService } from '../api-service/country-api.service';
import { CoursesService } from '../courses.service';
import { course } from '../courses-interface';
import { ApiHandlerService } from '../api-service/api-handler.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent {

  date : Number = new Date().getFullYear();
  loading: boolean = false;

  countryApiContainer: any;
  stateApiContainer: any;
  courses: course[] = [];
  allApplicantApi: any;

  constructor(private countryApi: CountryApiService, private apiHandler: ApiHandlerService, private coursesservice: CoursesService, private router: Router, private route: ActivatedRoute){}


  applicantForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(1)]),
    otherName: new FormControl('', [Validators.required, Validators.minLength(1)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(1)]),
    DOB: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    stateOfOrigin: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    modeOfLearning: new FormControl('', [Validators.required]),
    preferredCourse: new FormControl('', [Validators.required]),
  })

  
    onSubmit(data: any) {
      this.loading = true;
      if (this.applicantForm.invalid) {
        Swal.fire({
          title: 'Error!',
          text: 'Enter the right details',
          icon: 'error',
          confirmButtonText: 'Okay'
        })
        this.loading = false;
      } else if(this.applicantForm.value.password != this.applicantForm.value.confirmPassword){
        Swal.fire({
          title: 'Error!',
          text: 'The password and confirmation password do not match',
          icon: 'error',
          confirmButtonText: 'Okay'
        })
        this.loading = false;
      }     
      else {
        
        this.apiHandler.postApplicantApi(data).subscribe({
          next: (response) => {

            Swal.fire({
              title: 'Success!',
              text: 'Submitted successfully',
              icon: 'success',
              confirmButtonText: 'Done'
            });
            this.applicantForm.reset();  // to reset newform
            this.loading = false;


            this.apiHandler.getApplicantApi().subscribe(data => {
              this.allApplicantApi = data;
              this.router.navigate([`/admission/${this.allApplicantApi.length}`]);
            })
            
          },
          error: (err) => console.log(err),
        })
      }
  }


  getCountryApi(){
    this.countryApi.getCountryApi().subscribe(data => this.countryApiContainer = data)
  }

  getStateApi(){
    this.countryApi.getStateApi().subscribe(data => this.stateApiContainer = data)
  }

  getCourse(){
    this.coursesservice.getCourses().subscribe(course => this.courses = course)
  }


  ngOnInit(){
    this.getCountryApi();
    this.getStateApi();
    this.getCourse();
  }
}
