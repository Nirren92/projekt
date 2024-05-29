import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { Food } from '../model/food';


@Injectable({
  providedIn: 'root'
})
export class FoodService {
 url: string = 'http://localhost:3000/api/food';


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
    return this.http.post(this.url, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  deleteFood(foodIDin: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { foodID: foodIDin };
    return this.http.delete(this.url,{ headers, body });
  }



}
