import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookService } from '../service/book.service';
import { Book } from '../model/book';
import { Table } from '../model/table';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';



@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  
  bookList: Book[] = [];
  tableList: Table[] = [];
  bookForm: FormGroup;

  bookedList:Table[] =[];
  bookedList2:Book[] =[];
  ngOnInit(): void {

      this.bookService.getBooking(localStorage.getItem("username")||"").subscribe({
        next: (response) => {
          this.bookedList = response;
          this.bookedList2 = response;
        },
        error: (error) => {
          console.error('Nåt gick fel', error);
        }
      });
    
    
        
  }




  constructor(private bookService: BookService, private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      bookingDate: ['', Validators.required],
      bookingtime: ['', Validators.required],
      numberGuests: ['', [Validators.required, Validators.min(1)]]
    });
    
     }

getFreeTable() {
  if (this.bookForm.valid) {
    this.bookService.getFreeTable(this.bookForm.value).subscribe({
      next: (response) => {
        this.tableList = response;
      },
      error: (error) => {
        console.error('Nåt gick fel', error);
      }
    });
  }
}

bookTable(tableID:string) {
  if (this.bookForm.valid) {
    this.bookService.bookTable(tableID,this.bookForm.value).subscribe({
      next: (response) => {
        console.log('bokning tillagt', response);
        this.getFreeTable()
        this.ngOnInit()
      },
      error: (error) => {
        console.error('Nåt gick fel', error);
      }
    });
  }
}





}
