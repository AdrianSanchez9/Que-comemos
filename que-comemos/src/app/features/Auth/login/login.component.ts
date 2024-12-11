import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../../core/services/auth/login.service';
import { LoginRequest } from '../../../core/services/auth/loginRequest';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginError : string = "";

  private formBuilder = inject(FormBuilder);

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
          this.loginForm.reset();
        }
      })
    }
    else{
      this.loginForm.markAllAsTouched();
      console.log("No se puede iniciar Sesión");
    }
  }




}
