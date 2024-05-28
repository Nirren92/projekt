import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FoodService } from '../service/food.service';
import { Food } from '../model/food';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './food.component.html',
  styleUrl: './food.component.scss'
})
export class FoodComponent {
  foodList: Food[] = [];
  foodForm: FormGroup;
  containForm: FormGroup;
  containsList: string[] = [];

  constructor(private foodService: FoodService,private fb: FormBuilder,private fb2: FormBuilder) {
    this.foodForm = this.fb.group({
      foodID: ['', Validators.required],
      group: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required]
      
    });

    this.containForm = this.fb2.group({
      contains: ['', Validators.required],      
    });

     }
     
     addFood() {
      if (this.foodForm.valid) {
        this.foodService.addFood(this.foodForm.value, this.containsList).subscribe({
          next: (response) => {
            console.log('Food tillagt', response);
            this.foodList.push(response);
            this.foodForm.reset();
            this.resetContain(); 
          },
          error: (error) => {
            console.error('nåt gick fel', error)
          }
        });
      } 
    }
    
    deleteFood(foodID:number)
    {
      this.foodService.deleteFood(foodID).subscribe({
        next: (response) => {
          console.log('bortaget', response);
          this.ngOnInit();
        },
        error: (error) => {
          console.error('Nåt gick fel', error);
        }
      });
    }

    addContain()
    { 
      if (this.containForm.valid) {
        this.containsList.push(this.containForm.value.contains);
        this.containForm.reset();
      }
      
    }
    
    resetContain()
    {
      this.containsList=[];
    }


  ngOnInit() {
    this.foodService.getFood().subscribe((data) => {
    this.foodList = data;
  });
}



}
