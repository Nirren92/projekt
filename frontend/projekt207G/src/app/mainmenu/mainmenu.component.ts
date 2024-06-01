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
    const temp = localStorage.getItem("jwt");
    console.log("jwt", temp);
    if (!temp) {
      this.jwtcheck = true;
    }
    console.log("jwtcheck", this.jwtcheck); // Lägg till denna rad för att kontrollera värdet av jwtcheck
  }
  
  
}
