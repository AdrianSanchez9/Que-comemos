import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { authGuardGuard } from '../../core/guard/auth-guard.guard';
import { ComidaComponent } from './comida/comida.component';


export const ARTICLES_ROUTES: Routes = [
    { path: 'registrar' , component: MenuComponent, canActivate: [authGuardGuard] },
    { path: 'editar/:id' , component: MenuComponent, canActivate: [authGuardGuard]},
    { path: 'crear' , component: ComidaComponent }
    //{ path: 'ver' , component: MenuItemComponent }
];