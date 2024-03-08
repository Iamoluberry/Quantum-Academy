import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryApiService {

  constructor(private http: HttpClient) { }

  getCountryApi(): Observable<any>{
    return this.http.get('https://65e7219453d564627a8e067e.mockapi.io/country');
  }

  getStateApi(): Observable<any>{
    return this.http.get('https://65e7219453d564627a8e067e.mockapi.io/state')
  }
}
