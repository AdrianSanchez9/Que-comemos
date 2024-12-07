import { Component, Input } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterOutlet, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatSidenavModule,
    RouterModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input({required: true}) displaySidebar!: boolean;
}
