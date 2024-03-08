import { Component } from '@angular/core';
import { CoursesService } from '../courses.service';
import { course } from '../courses-interface';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  date : Number = new Date().getFullYear();
  courses: course[] = []

  constructor(private coursesservice: CoursesService){}


  getCourse(){
    this.coursesservice.getCourses().subscribe(course => this.courses = course)
  }

  ngOnInit(){
    this.getCourse()
  }
}
