import { Routes } from '@angular/router';
import { FoodComponent } from './food/food.component';
import { TableComponent } from './table/table.component';
import { BookComponent } from './book/book.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [

    {path:'food', component:FoodComponent},
    {path:'table', component:TableComponent},
    {path:'book', component:BookComponent},
    {path:'home', component:HomeComponent},
    {path:'login', component:LoginComponent},
    {path:'', redirectTo:'/home', pathMatch:'full'}


];
