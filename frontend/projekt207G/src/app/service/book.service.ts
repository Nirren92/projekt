import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from '../model/table';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  url: string = 'http://localhost:3000/api/booking';
  url2: string = 'http://localhost:3000/api/freetables';
constructor(private http: HttpClient) { }



getFreeTable(tableData:any):Observable<any>{
  const date = new Date(tableData.bookingDate);
  const timeString = tableData.bookingtime;
  const [hours, minutes] = timeString.split(':').map(Number);
  date.setHours(hours, minutes,0,0);
  const formateraddatum = date.toISOString();

  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const body = { bookingDate: formateraddatum ,
    numberGuests:tableData.numberGuests
   };

 console.log("tiden är"+date);
 return this.http.post<Table[]>(this.url2, body, { headers });
} 

bookTable(tableID:string,tableData:any):Observable<any>
{
  const date = new Date(tableData.bookingDate);
  const timeString = tableData.bookingtime;
  const [hours, minutes] = timeString.split(':').map(Number);
  date.setHours(hours, minutes,0,0);
  const formateraddatum = date.toISOString();

  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const body = { bookingDate: formateraddatum ,
    numberGuests:tableData.numberGuests,
    username:"Niklas",
    tableID:tableID

   };


   return this.http.post(this.url, body, { headers });

}

}
