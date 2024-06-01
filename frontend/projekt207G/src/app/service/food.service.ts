import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { Food } from '../model/food';


@Injectable({
  providedIn: 'root'
})
export class FoodService {
 url: string = 'https://projekt-6hzw.onrender.com/api/food';
 urlprotected: string = 'https://projekt-6hzw.onrender.com/apiprotected/food';
 

  constructor(private http: HttpClient) {}

  getFood():Observable<Food[]>{
    return this.http.get<Food[]>(this.url);
  } 

  //Kontroll av data här också?
  addFood(foodData: any, containsList:string[]): Observable<any> {
    const body = {
      ...foodData,
      contains: containsList
    };
    return this.http.post(this.urlprotected, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.getToken()},
        'usernamne': ${this.getUsername()}
        `
      })
    });
  }


  deleteFood(foodIDin: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`
    });
  
    const options = {
      headers: headers,
      body: { foodID: foodIDin.toString() }
    };
  
    return this.http.delete(this.urlprotected, options);
  }

  
  private getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  private getUsername(): string | null {
    return localStorage.getItem('username');
}

}
