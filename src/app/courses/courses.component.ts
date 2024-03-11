import { Component } from '@angular/core';
import { CoursesService } from '../courses.service';
import { course } from '../courses-interface';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  date : Number = new Date().getFullYear();
  courses: course[] = []

  constructor(private coursesservice: CoursesService, private router: Router){}


  getCourse(){
    this.coursesservice.getCourses().subscribe(course => this.courses = course)
  }

  scrollToTop(){
    window.scroll(0,0);
  }

  ngOnInit(){
    this.getCourse();
    this.scrollToTop()
  }
}
