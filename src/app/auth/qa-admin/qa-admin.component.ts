import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ApiHandlerService } from 'src/app/api-service/api-handler.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { first } from 'rxjs';
import { course } from 'src/app/courses-interface';
import { CountryApiService } from 'src/app/api-service/country-api.service';
import { CoursesService } from 'src/app/courses.service';

@Component({
  selector: 'app-qa-admin',
  templateUrl: './qa-admin.component.html',
  styleUrls: ['./qa-admin.component.css']
})
export class QaAdminComponent {
  date : Number = new Date().getFullYear();
  students: any;
  complaints: any;

  countryApiContainer: any;
  stateApiContainer: any;
  courses: course[] = [];

  displayUserDetails: boolean = true;
  displayngModelForm: boolean = false;

  showApplicantTable: boolean = false;
  showComplaintTable: boolean = false;

  applicantCheckboxClick(){
    const checkbox = document.getElementById('toggleApplicantCheckbox') as HTMLInputElement;
    if (checkbox.checked) {
      this.showApplicantTable = true;
    } else {
      this.showApplicantTable = false;
    }
  }

  complaintCheckboxClick(){
    const checkbox = document.getElementById('toggleComplaintCheckbox') as HTMLInputElement;
    if (checkbox.checked) {
      this.showComplaintTable = true;
    } else {
      this.showComplaintTable = false;
    }
  }



  constructor(private apiHandler: ApiHandlerService, private router: Router, public location: Location, private countryApi: CountryApiService, private coursesservice: CoursesService,){}


  getApi(){
    this.apiHandler.getApplicantApi().subscribe(data => this.students = data);
  }

  getComplaintsApi(){
    this.apiHandler.getComplaintsApi().subscribe(data => this.complaints = data)
  }
  
  deleteComplaint(complaint: {id: any, firstName: string, lastName: string}){
    this.apiHandler.deleteComplaintsApi(complaint.id).subscribe();
    Swal.fire({
      title: 'Success!',
      text: `${complaint.firstName} ${complaint.lastName} complaint resolved successfully`,
      icon: 'success',
      confirmButtonText: 'Done'
    });
  }

  editApi(student: {id: any, firstName: string, lastName: string}){
    this.displayUserDetails = false;
    this.displayngModelForm = true;

  }

  deleteApi(student: {id: any, firstName: string, lastName: string}){
      this.apiHandler.deleteApi(student.id).subscribe();
    Swal.fire({
      title: 'Success!',
      text: `${student.firstName} ${student.lastName} details delected successfully`,
      icon: 'success',
      confirmButtonText: 'Done'
    });
  }

  saveEdittedApi(student: {id: any, firstName: string, lastName: string}){
    
      if (student) {
        const indexToEdit = student.id;
        this.apiHandler.putApi(indexToEdit, student).subscribe();
        Swal.fire({
          title: 'Success!',
          text: `${student.firstName} ${student.lastName} details editted successfully`,
          icon: 'success',
          confirmButtonText: 'Done'
        });
        this.displayUserDetails = true;
        this.displayngModelForm = false;
      } else {
        window.location.reload();
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

  logOut(){
    Swal.fire({
      title: 'Success!',
      text: 'Admin successfully logged out',
      icon: 'success',
      confirmButtonText: 'Done'
    });
  }


  ngOnInit(){
    this.getCountryApi();
    this.getStateApi();
    this.getCourse();
    this.getApi();
    this.getComplaintsApi()
  }
}



