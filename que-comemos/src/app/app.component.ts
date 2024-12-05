import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { LoginComponent } from "./features/Auth/login/login.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'que-comemos';
}
