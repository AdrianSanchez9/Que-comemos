import { Routes } from '@angular/router';
import { authGuardGuard } from '../../core/guard/auth-guard.guard';
import { ListarMenuComponent } from './listar-menu/listar-menu.component';
import { ListarComidaComponent } from './listar-comida/listar-comida.component';

export const LIST_ROUTES: Routes = [
    { path: 'menus' , component: ListarMenuComponent, canActivate: [authGuardGuard] },
    { path: 'comidas' , component: ListarComidaComponent, canActivate: [authGuardGuard] }
];