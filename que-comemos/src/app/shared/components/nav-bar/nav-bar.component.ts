import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../core/services/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  userLogin : boolean = false;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginService.userLogin.subscribe({
      next: (userLoginResponse) => {
        this.userLogin = userLoginResponse;
      }
    });
  }

  logout () {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  @Output() emitToggleSidenav: EventEmitter<void> = new EventEmitter();

  emitToggleEvent(): void {
    this.emitToggleSidenav.emit();
  }
}
