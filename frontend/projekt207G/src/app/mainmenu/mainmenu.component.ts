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
  user: boolean = false;
  userinne: boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
            console.log("kör")
        this.admin = localStorage.getItem("username") == "admin";
        this.admininne = !this.admin;

        this.user = localStorage.getItem("jwt") ? true : false;
        this.userinne = !this.admin;
      }
    });
  }

  loggaut(): void {
    localStorage.setItem("username","");
    localStorage.setItem("jwt","");
 
    this.router.navigate(['/home']); 
    
    this.ngOnInit();
  }
  
}
