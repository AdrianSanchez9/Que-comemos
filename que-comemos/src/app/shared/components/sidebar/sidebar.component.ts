import { Component, Input ,inject, OnInit} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterOutlet, RouterLink, RouterModule, Router } from '@angular/router';
import { LoginService } from '../../../core/services/auth/login.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  private _snackBar = inject(MatSnackBar);

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginService.userLogin.subscribe({
      next: (userLoginResponse) => {
        this.userLogin = userLoginResponse;
      }
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Cerrar", {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 6000,
    });
  }

  logout () {
    
    setTimeout(() => {
      this.loginService.logout();
      this.router.navigate(['/auth/login']);
      this.openSnackBar('Se cerró sesión correctamente.');
    }, 300);  
  }


}
