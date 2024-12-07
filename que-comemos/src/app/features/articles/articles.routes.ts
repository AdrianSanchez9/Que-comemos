import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';

export const MENU_ROUTES: Routes = [
    { path: 'registrar' , component: MenuComponent },
    { path: 'ver' , component: MenuItemComponent }
];