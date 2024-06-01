import {Component} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mainmenu',
  standalone: true,
  imports: [CommonModule,MatButtonModule, MatMenuModule,RouterLink, RouterLinkActive],
  templateUrl: './mainmenu.component.html',
  styleUrl: './mainmenu.component.scss'
})
export class MainmenuComponent  {
  admin: boolean = false;
  admininne: boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
   
      if (event instanceof NavigationEnd) 
        this.admin = localStorage.getItem("jwt") ? true : false;
      this.admininne = !this.admin;
      }
    );
  }
  
  
  
  
}
