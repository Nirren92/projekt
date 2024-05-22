import { Routes } from '@angular/router';
import { FoodComponent } from './food/food.component';
import { TableComponent } from './table/table.component';
import { BookComponent } from './book/book.component';

export const routes: Routes = [

    {path:'food', component:FoodComponent},
    {path:'table', component:TableComponent},
    {path:'book', component:BookComponent},
    {path:'', redirectTo:'/food', pathMatch:'full'}


];
