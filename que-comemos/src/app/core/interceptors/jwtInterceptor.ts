import { HttpEvent, HttpRequest, HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from '../services/auth/login.service';
import { catchError } from 'rxjs/operators'; 
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

export const jwtInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const loginService = inject(LoginService); 
  const router = inject(Router);
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

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) { // Token expirado o no autorizado
        console.warn('Token expired or unauthorized. Redirecting to login.');
        loginService.logout(); // Limpia cualquier dato relacionado al usuario
        router.navigate(['/auth/login']); // Redirige al login
      }
      return throwError(() => error); // Lanza el error para que el componente lo maneje
    })
  );
};
