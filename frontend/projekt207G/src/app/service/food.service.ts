import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
