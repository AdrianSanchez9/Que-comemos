// src/app/app.routes.ts
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta para Home
  { 
    path: 'auth', 
    loadChildren: () => import('./features/Auth/auth.routes').
        then(m => m.AUTH_ROUTES)
  },
];



