import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../../core/services/auth/login.service';

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

  constructor (private router: Router, private loginService: LoginService) {}

  get email () {
    return this.loginForm.controls.email;
  }

  
  get password () {
    return this.loginForm.controls.password;
  }
    
  login (){
    if (this.loginForm.valid){
      this.loginService.login(this.loginForm.value);
      this.router.navigate(['/']);
      this.loginForm.reset();
    }
    else{
      this.loginForm.markAllAsTouched();
      console.log("No se puede iniciar Sesión");
    }
  }




}
