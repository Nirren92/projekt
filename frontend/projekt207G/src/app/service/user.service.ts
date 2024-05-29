import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 url: string = 'http://localhost:3000/api/login';


  constructor(private http: HttpClient) {}

  //Kontroll av data här också?
  logIn(userData: any): Observable<any> {
    return this.http.post(this.url, userData);
  }
}
