import { Component, EventEmitter, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink, RouterModule } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  @Output() emitToggleSidenav: EventEmitter<void> = new EventEmitter();

  emitToggleEvent(): void {
    this.emitToggleSidenav.emit();
  }
}
