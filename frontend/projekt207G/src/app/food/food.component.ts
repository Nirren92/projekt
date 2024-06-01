import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FoodService } from '../service/food.service';
import { Food } from '../model/food';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilterGroupPipe } from '../filter-group.pipe';
import { NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
  
})

export class FoodComponent {
  foodList: Food[] = [];
  foodForm: FormGroup;
  containForm: FormGroup;
  containsList: string[] = [];
  admin: boolean = false;
  admininne: boolean = false;
  user: boolean = false;
  userinne: boolean = false;


  constructor(private foodService: FoodService,private fb: FormBuilder,private fb2: FormBuilder) {
    this.foodForm = this.fb.group({
      foodID: ['', Validators.required],
      group: ['', [Validators.required, Validators.pattern(/^(huvudrätt|förrätt|efterrätt)$/)]],
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
 
    this.admin = localStorage.getItem("username") =="admin";
    this.admininne = !this.admin;
  
    this.user = localStorage.getItem("jwt") ? true : false;
    this.userinne = !this.admin;
    

  });
}



}

@NgModule({
  declarations: [
    FoodComponent, 
    FilterGroupPipe 
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class FoodModule {
 
}