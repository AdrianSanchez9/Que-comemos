// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./features/Auth/auth.routes').
        then(m => m.AUTH_ROUTES)
  },
  { 
    path: 'menu', 
    loadChildren: () => import('./features/articles/articles.routes').
        then(m => m.ARTICLES_ROUTES)
  },
  { 
    path: 'comida', 
    loadChildren: () => import('./features/articles/articles.routes').
        then(m => m.ARTICLES_ROUTES)
  },
  
];

