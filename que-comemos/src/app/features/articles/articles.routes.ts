import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { authGuardGuard } from '../../core/guard/auth-guard.guard';
export const MENU_ROUTES: Routes = [
    { path: 'registrar' , component: MenuComponent, canActivate: [authGuardGuard] },
    { path: 'editar/:id' , component: MenuComponent, canActivate: [authGuardGuard]},
    //{ path: 'ver' , component: MenuItemComponent }
];