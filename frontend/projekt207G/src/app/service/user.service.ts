import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 url: string = 'https://projekt-6hzw.onrender.com/api/login';
 url2: string = 'https://projekt-6hzw.onrender.com/api/register';


  constructor(private http: HttpClient) {}

  //Kontroll av data här också?
  logIn(userData: any): Observable<any> {
    return this.http.post(this.url, userData);
  }

  addUser(userData: any): Observable<any> {
    return this.http.post(this.url2, userData);
  }

}
