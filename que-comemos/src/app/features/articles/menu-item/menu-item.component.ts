import { MenuItemService } from '../../../core/services/articles/menu-item.service';
import { Component, inject, Input, OnInit } from '@angular/core';
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
  @Input() idMenu : number = 0;

  private formBuilder = inject(FormBuilder);

  entrada : MenuItemResponse[] = [];
  platoPrincipal : MenuItemResponse []= [];
  bebida : MenuItemResponse[] = [];
  postre : MenuItemResponse[] = [];

  seleccionados : number[] = [];

  idsComidasAsociadas : number[] = [];

  comidasForm = this.formBuilder.group({
    entrada : [Validators.required],
    platoPrincipal : [Validators.required],
    bebida : [Validators.required],
    postre : [Validators.required]
  });

  constructor (private menuItemService : MenuItemService){ }

  ngOnInit(): void {
    this.getMenuItems();
    if (this.idMenu != 0){
      this.getComidasAsociadasAMenu(this.idMenu);
    }
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

  getComidasAsociadasAMenu(idMenu : number) : void{
    this.menuItemService.getComidasAsociadasAMenu(idMenu).subscribe({
      next: (response) => {
        this.idsComidasAsociadas = response.map((item:MenuItemResponse) => item.id);
        
        this.seleccionados = this.idsComidasAsociadas;
        
        this.idsComidasSeleccionas.emit(this.seleccionados);
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
    const selectedValue = selectElement.value;
  
    const [id, index] = selectedValue.split('-').map(Number);

    if (!isNaN(id)) {
      this.seleccionados[index] = id; 
      this.idsComidasSeleccionas.emit(this.seleccionados);
    }
    
  }

  

}
