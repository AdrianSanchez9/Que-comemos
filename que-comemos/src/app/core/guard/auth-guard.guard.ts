import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/auth/login.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.userToken){
    return true;
  }else {
     router.navigate(['/login']);
     return false;
  }

};
