// src/app/app.routes.ts
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta para Home
  { 
    path: 'auth', 
    loadChildren: () => import('./features/Auth/auth.routes').
        then(m => m.AUTH_ROUTES)
  },
  {
    path: 'registro',
    loadChildren: () => import('./features/registro/registro.routes').
        then(m => m.REGISTRO_ROUTES)
  },
  { 
    path: 'menu', 
    loadChildren: () => import('./features/articles/articles.routes').
        then(m => m.MENU_ROUTES)
  },
];



