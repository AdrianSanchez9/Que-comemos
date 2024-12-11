import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HTTP_INTERCEPTORS, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './core/interceptors/errorInterceptor';
import { jwtInterceptor } from './core/interceptors/jwtInterceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [ 
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([jwtInterceptor]), 
    ),
  ] 
    
};
