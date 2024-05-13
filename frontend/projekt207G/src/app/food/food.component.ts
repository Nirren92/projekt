import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FoodService } from '../service/food.service';
import { Food } from '../model/food';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food.component.html',
  styleUrl: './food.component.scss'
})
export class FoodComponent {
  foodList: Food[] = [];

  constructor(private foodService: FoodService) {

    
     }


  ngOnInit() {
    this.foodService.getFood().subscribe((data) => {
    this.foodList = data;
  });
}



}
