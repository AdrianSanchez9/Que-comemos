import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  private formBuilder = inject(FormBuilder);

   loginForm =  this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    }); 

  constructor (private router: Router) {}

  get email () {
    return this.loginForm.controls.email;
  }

  
  get password () {
    return this.loginForm.controls.password;
  }
    
  login (){
    if (this.loginForm.valid){
      console.log("Se puede iniciar Sesión Correctamente");
      this.router.navigate(['/']);
      this.loginForm.reset();
    }
    else{
      this.loginForm.markAllAsTouched();
      console.log("No se puede iniciar Sesión");
    }
  }




}
