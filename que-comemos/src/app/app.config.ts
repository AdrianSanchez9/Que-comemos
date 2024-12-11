import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ErrorInterceptorsService } from './core/interceptors/error-interceptors.service';
import { JwtInterceptorsService } from './core/interceptors/jwt-interceptors.service';


import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [ 
    provideRouter(routes),
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorsService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorsService, multi: true }
  
  ] 
    
};
