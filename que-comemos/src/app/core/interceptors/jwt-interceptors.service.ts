import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/auth/login.service';

@Injectable({
  providedIn: 'root'
})


export class JwtInterceptorsService implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: String = this.loginService.userToken;
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
    return next.handle(req);
  }
}