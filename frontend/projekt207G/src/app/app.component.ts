import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MainmenuComponent } from "./mainmenu/mainmenu.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet,RouterLink,MainmenuComponent]
})


export class AppComponent {
  title = 'projekt207G';
}
