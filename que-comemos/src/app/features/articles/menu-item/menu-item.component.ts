import { MenuItemService } from '../../../core/services/articles/menu-item.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemResponse } from '../../../core/services/articles/menuItemResponse';
import { Output,EventEmitter } from '@angular/core';
import { Validators,FormBuilder  } from '@angular/forms';

@Component({
  selector: 'app-menu-item',
  imports: [CommonModule],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css'
})
export class MenuItemComponent implements OnInit {

  @Output() idsComidasSeleccionas =  new EventEmitter<number[]>();

  private formBuilder = inject(FormBuilder);

  entrada : MenuItemResponse[] = [];
  platoPrincipal : MenuItemResponse []= [];
  bebida : MenuItemResponse[] = [];
  postre : MenuItemResponse[] = [];

  seleccionados : number[] = [];

  comidasForm = this.formBuilder.group({
    entrada : [Validators.required],
    platoPrincipal : [Validators.required],
    bebida : [Validators.required],
    postre : [Validators.required]
  });

  constructor (private menuItemService : MenuItemService){ }

  ngOnInit(): void {
    this.getMenuItems();
  }

  // Se obtiene las comidas del servicio y se filtran por tipo.
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

   // Se van guardando los id de las comidas seleccionadas y es emitido.
   numeroSeleccionado(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const comidaId = Number(selectElement.value);  

    if (!isNaN(comidaId)) {
      this.seleccionados.push(comidaId);  
      this.idsComidasSeleccionas.emit(this.seleccionados); 
    }
  }

  

}
