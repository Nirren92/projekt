import { Routes } from '@angular/router';
import { FoodComponent } from './food/food.component';

export const routes: Routes = [

    {path:"food", component:FoodComponent},
    {path:"", redirectTo:'/food', pathMatch:'full'}


];
