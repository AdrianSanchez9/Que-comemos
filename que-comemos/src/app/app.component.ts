import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { LoginComponent } from "./features/Auth/login/login.component";
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { routes } from './app.routes';
import { HomeComponent } from './shared/components/home/home.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavBarComponent,
    SidebarComponent,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'que-comemos';
  displaySidebar: boolean = true;
  onToggleEvent(){
    this.displaySidebar = !this.displaySidebar;
  }
}
