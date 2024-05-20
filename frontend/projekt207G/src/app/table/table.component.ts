import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableService } from '../service/table.service';
import { Table } from '../model/table';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  tableList: Table[] = [];
  tableForm: FormGroup;

  constructor(private tableService: TableService, private fb: FormBuilder) {
    this.tableForm = this.fb.group({
      tableID: ['', [Validators.required, Validators.maxLength(20)]],
      capacity: ['', [Validators.required, Validators.min(1)]],
      location: ['', [Validators.required]]
    });
    
     }


  ngOnInit() {
    this.tableService.getTable().subscribe((data) => {
    this.tableList = data;
  });
}

deleteTable(tableID:string)
{
  this.tableService.deleteTable(tableID).subscribe({
    next: (response) => {
      console.log('Bord bortaget', response);
      this.ngOnInit();
    },
    error: (error) => {
      console.error('Nåt gick fel', error);
    }
  });
}

addTable() {
  if (this.tableForm.valid) {
    this.tableService.addTable(this.tableForm.value).subscribe({
      next: (response) => {
        console.log('Bord tillagt', response);
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Nåt gick fel', error);
      }
    });
  }
}

}
