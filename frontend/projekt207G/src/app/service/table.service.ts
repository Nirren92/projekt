import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from '../model/table';

@Injectable({
  providedIn: 'root'
})
export class TableService {
 url: string = 'http://localhost:3000/api/table';


  constructor(private http: HttpClient) {}

  getTable():Observable<Table[]>{
    return this.http.get<Table[]>(this.url);
  } 

  deleteTable(tableIDin: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { tableID: tableIDin };
    return this.http.delete(this.url,{ headers, body });
  }

  addTable(tableData: any): Observable<any> {
    return this.http.post(this.url, tableData);
  }
}
