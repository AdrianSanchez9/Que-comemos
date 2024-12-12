import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../../core/services/auth/login.service';
import { LoginRequest } from '../../../core/services/auth/loginRequest';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule,MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginError : string = "";

  private formBuilder = inject(FormBuilder);
  private _snackBar = inject(MatSnackBar);

   loginForm =  this.formBuilder.group({
      dni: ['', [Validators.required]],
      clave: ['', [Validators.required]]
    }); 

  constructor (private router: Router, private loginService: LoginService) {}

  get dni () {
    return this.loginForm.controls.dni;
  }
  
  get clave () {
    return this.loginForm.controls.clave;
  }
    
  login (){
    if (this.loginForm.valid){
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          this.loginError = error || 'Error desconocido. Intente nuevamente.';
        },
        complete: () => {
          console.info('Complete');
          this.router.navigate(['/']);
          this.openSnackBar('Inicio Sesión Correctamente.');
          this.loginForm.reset();
        }
      })
    }
    else{
      this.loginForm.markAllAsTouched();
      console.log("No se puede iniciar Sesión");
    }
  }


  openSnackBar(message: string) {
    this._snackBar.open(message, "Cerrar", {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 6000,
    });
  }


}
