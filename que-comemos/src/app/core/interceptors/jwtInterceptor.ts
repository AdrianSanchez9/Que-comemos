import { HttpEvent, HttpRequest, HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from '../services/auth/login.service';

export const jwtInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const loginService = inject(LoginService); 
  const token: String = loginService.userToken;
  console.log('Adding token:', token);

  
  if (token && req.method !== 'OPTIONS') {
    req = req.clone({
      setHeaders: {
        'Content-type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  return next(req); 
};
