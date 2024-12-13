import { Component,OnInit } from '@angular/core';
import { MenuService } from '../../../core/services/articles/menu.service';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { Menu } from '../../../core/models/menu-interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listar-menu',
  imports: [
    MatIconModule, 
    MatDividerModule, 
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './listar-menu.component.html',
  styleUrl: './listar-menu.component.css'
})
export class ListarMenuComponent implements OnInit {

  menus: Menu[] = [];

  constructor(private menuService: MenuService, private router:Router) {}

  ngOnInit(): void {
    this.menuService.getMenus().subscribe({
      next: (response: Menu[]) => {
        
        this.menus = response.map(menu => ({
          id: menu.id,                
          nombre: menu.nombre,       
          tipoMenu: menu.tipoMenu,    
          precio: menu.precio,       
          comidas: [0, 1, 2, 3].map(index => {
            const tipoComida = this.getTipoComidaPorPosicion(index);
            
            const comida = menu.comidas.find(c => c.tipo === tipoComida);
            return comida ? {
              id: comida.id,            
              nombre: comida.nombre,    
              tipo: comida.tipo         
            } : {
              id: 0,
              nombre: `Sin ${tipoComida.toLowerCase()}`,  
              tipo: tipoComida
            };
          })
        }));     
      },
      error: (error) => {
        console.error('Error al obtener los menús', error);
      }
    });
  }

  getTipoComidaPorPosicion(index: number): string {
    const tipos = ['ENTRADA', 'PLATO_PRINCIPAL', 'POSTRE', 'BEBIDA'];
    return tipos[index];
  }

  editarMenu(id: number): void {
    this.router.navigate(['menu/editar', id]); 
  }

}
