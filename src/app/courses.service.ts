import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { course } from './courses-interface';
import { COURSES } from './courses-container';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() { }

  getCourses(): Observable<course[]>{
    const courses = of(COURSES);
    return courses
  }
}
