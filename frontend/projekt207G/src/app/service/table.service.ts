import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from '../model/table';

@Injectable({
  providedIn: 'root'
})
export class TableService {
 url: string = 'http://localhost:3000/apiprotected/table';


  constructor(private http: HttpClient) {}

  getTable():Observable<Table[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.get<Table[]>(this.url,{ headers });
  } 

  deleteTable(tableIDin: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });
    const body = { tableID: tableIDin };
    return this.http.delete(this.url,{ headers, body });
  }

  //Kontroll av data här också?
  addTable(tableData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.post(this.url, tableData,{ headers });
  }


  private getToken(): string | null {
    return localStorage.getItem('jwt');
  }



}
