import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  username:string = " "


  ngOnInit(): void {

    
    
    this.username = localStorage.getItem("username") || "du är inte inloggad";
        

        
  }

  
}
