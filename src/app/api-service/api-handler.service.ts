import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {

  constructor(private http: HttpClient) { }

  postApplicantApi(data: any): Observable<any>{
    return this.http.post('https://65e7364a53d564627a8e4032.mockapi.io/QuantumAcademy', data)
  }

  postComplaintsApi(data: any): Observable<any>{
    return this.http.post('https://65e7364a53d564627a8e4032.mockapi.io/QuantumAcademyComplaints', data)
  }

  getComplaintsApi(): Observable<any>{
    return this.http.get('https://65e7364a53d564627a8e4032.mockapi.io/QuantumAcademyComplaints')
  }

  deleteComplaintsApi(id: any): Observable<any>{
    return this.http.delete(`https://65e7364a53d564627a8e4032.mockapi.io/QuantumAcademyComplaints/${id}`)
  }

  getApplicantApi(): Observable<any>{
    return this.http.get('https://65e7364a53d564627a8e4032.mockapi.io/QuantumAcademy')
  }

  deleteApi(id: any): Observable<any> {
    const url = `https://65e7364a53d564627a8e4032.mockapi.io/QuantumAcademy/${id}`;
    return this.http.delete(url);
  }
  
  putApi(id: any, data: any): Observable<any>{
    const url = `https://65e7364a53d564627a8e4032.mockapi.io/QuantumAcademy/${id}`;
    return this.http.put(url, data)
  }

}
