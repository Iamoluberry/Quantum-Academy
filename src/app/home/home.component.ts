import { Component } from '@angular/core';
import * as AOS from 'aos';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  date : Number = new Date().getFullYear();
  ngOnInit(){
    AOS.init({
      duration: 1200,
    })
  }
}
