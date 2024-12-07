import { MenuItemService } from '../../../core/services/articles/menu-item.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemResponse } from '../../../core/services/articles/menuItemResponse';
import { Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  imports: [CommonModule],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css'
})
export class MenuItemComponent implements OnInit {

  @Output() idsComidasSeleccionas = new EventEmitter<any>();

  entrada : MenuItemResponse[] = [];
  platoPrincipal : MenuItemResponse []= [];
  bebida : MenuItemResponse[] = [];
  postre : MenuItemResponse[] = [];

  constructor (private menuItemService : MenuItemService){ }

  ngOnInit(): void {
    this.getMenuItems();
  }

  getMenuItems() : void{
    this.menuItemService.getMenuItems().subscribe({
      next: (response) => {
        console.log (response);
        this.entrada =  response.filter((item:MenuItemResponse) => item.tipo === 'ENTRADA');
        this.platoPrincipal = response.filter((item:MenuItemResponse) => item.tipo === 'PLATO_PRINCIPAL');
        this.bebida = response.filter((item:MenuItemResponse) => item.tipo === 'BEBIDA');
        this.postre = response.filter((item:MenuItemResponse) => item.tipo === 'POSTRE');
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.info('Complete');
      },
    });
  }

  comidaSeleccionada (event : Event , tipo : string) : void {
    const idsComidas = (event.target as unknown as HTMLInputElement).value.split(',').map(Number);
    this.idsComidasSeleccionas.emit({ tipo, id: Number(idsComidas) || null });

  }

}
