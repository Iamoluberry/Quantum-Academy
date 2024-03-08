import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from '../../api-service/api-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { course } from 'src/app/courses-interface';
import { CountryApiService } from 'src/app/api-service/country-api.service';
import { CoursesService } from 'src/app/courses.service';



@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})
export class AdmissionComponent implements OnInit {
  date : Number = new Date().getFullYear();
  allApplicantApi: any;
  userDetails: any;

  countryApiContainer: any;
  stateApiContainer: any;
  courses: course[] = [];
  loading: boolean = false;

  displayUserDetails: boolean = true;
  displayngModelForm: boolean = false;

  constructor(private route: ActivatedRoute, public apiHandler: ApiHandlerService, private location: Location, private router: Router, private countryApi: CountryApiService, private coursesservice: CoursesService, private fb: FormBuilder) {


    
  }

  ngOnInit() {
    this.getApplicantApi();
    this.getCountryApi();
    this.getStateApi();
    this.getCourse();
  }

  getApplicantApi() {
    this.apiHandler.getApplicantApi().subscribe(data => {
      this.allApplicantApi = data;

      const routeId = this.route.snapshot.params['id'];
      this.userDetails = this.allApplicantApi.find(
        (QuantumAcademy: { id: string }) => QuantumAcademy.id === routeId
      );
    });
  }

  onClick(){
    Swal.fire({
      title: 'Success!',
      text: 'Congratulations!',
      icon: 'success',
      confirmButtonText: 'Done'
    });
    this.location.back();
  }

  forfeitAdmission(){
    const indexToDelete = this.userDetails.id;
    this.apiHandler.deleteApi(indexToDelete).subscribe();
    Swal.fire({
      title: 'Success!',
      text: 'Admission forfeited successfully',
      icon: 'success',
      confirmButtonText: 'Done'
    });
    this.router.navigate(['/contact']);
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



  editUserDetails() {

    this.displayUserDetails = false;
    this.displayngModelForm = true;

    
  }

  saveEdittedUserDetails(){

    if (this.userDetails.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Enter the right details',
        icon: 'error',
        confirmButtonText: 'Okay'
      })
      this.loading = false;
    } else {

      const indexToEdit = this.userDetails.id;
      this.apiHandler.putApi(indexToEdit, this.userDetails).subscribe();

      Swal.fire({
        title: 'Success!',
        text: 'Changes Made successfully',
        icon: 'success',
        confirmButtonText: 'Done'
      });

      this.displayUserDetails = true;
      this.displayngModelForm = false;
  }
  }
  
}


