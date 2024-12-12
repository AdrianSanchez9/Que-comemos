import { Component, Input } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterOutlet, RouterLink, RouterModule } from '@angular/router';
import { LoginService } from '../../../core/services/auth/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatSidenavModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  userLogin : boolean = false;

  @Input({required: true}) displaySidebar!: boolean;

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
    this.router.navigate(['/']);
  }


}
