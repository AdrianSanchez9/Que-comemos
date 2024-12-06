import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../core/services/auth/login.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [ CommonModule, RouterModule ],
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

}
