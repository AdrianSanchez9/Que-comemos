// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./features/Auth/auth.routes').
        then(m => m.AUTH_ROUTES)
  },
];

