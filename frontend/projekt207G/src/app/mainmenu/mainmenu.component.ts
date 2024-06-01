import {Component} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-mainmenu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule,RouterLink, RouterLinkActive],
  templateUrl: './mainmenu.component.html',
  styleUrl: './mainmenu.component.scss'
})
export class MainmenuComponent  {
  jwtcheck: boolean = false;
 
  constructor() { }

  ngOnInit(): void {

    this.jwtcheck = !!localStorage.getItem('jwt');
  }
  
}
