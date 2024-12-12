import { MenuItemService } from '../../../core/services/articles/menu-item.service';
import { Component, inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemResponse } from '../../../core/services/articles/menuItemResponse';
import { Validators, FormBuilder } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectChange } from '@angular/material/select';


@Component({
  selector: 'app-menu-item',
  imports: [
    CommonModule,
    MatFormFieldModule, MatSelectModule, MatOptionModule
  ],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css'
})
export class MenuItemComponent implements OnInit {

  @Output() idsComidasSeleccionas = new EventEmitter<number[]>();
  @Input() idMenu: number = 0;

  private formBuilder = inject(FormBuilder);

  entrada: MenuItemResponse[] = [];
  platoPrincipal: MenuItemResponse[] = [];
  bebida: MenuItemResponse[] = [];
  postre: MenuItemResponse[] = [];

  seleccionados: number[] = [];

  idsComidasAsociadas: number[] = [];


  comidasForm = this.formBuilder.group({
    entrada: [Validators.required],
    platoPrincipal: [Validators.required],
    bebida: [Validators.required],
    postre: [Validators.required]
  });

  constructor(private menuItemService: MenuItemService) { }

  ngOnInit(): void {
    this.getMenuItems();
    if (this.idMenu != 0) {
      this.getComidasAsociadasAMenu(this.idMenu);
    }
  }

  getMenuItems(): void {
    this.menuItemService.getMenuItems().subscribe({
      next: (response) => {
        console.log(response);
        this.entrada = response.filter((item: MenuItemResponse) => item.tipo === 'ENTRADA');
        this.platoPrincipal = response.filter((item: MenuItemResponse) => item.tipo === 'PLATO_PRINCIPAL');
        this.bebida = response.filter((item: MenuItemResponse) => item.tipo === 'BEBIDA');
        this.postre = response.filter((item: MenuItemResponse) => item.tipo === 'POSTRE');
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.info('Complete');
      },
    });
  }

  getComidasAsociadasAMenu(idMenu: number): void {
    this.menuItemService.getComidasAsociadasAMenu(idMenu).subscribe({
      next: (response) => {
        this.idsComidasAsociadas = response.map((item: MenuItemResponse) => item.id);

        this.seleccionados[0] = response.find((item: MenuItemResponse) => item.tipo === 'ENTRADA')!.id;
        this.seleccionados[1] = response.find((item: MenuItemResponse) => item.tipo === 'PLATO_PRINCIPAL')!.id;
        this.seleccionados[2] = response.find((item: MenuItemResponse) => item.tipo === 'POSTRE')!.id;
        this.seleccionados[3] = response.find((item: MenuItemResponse) => item.tipo === 'BEBIDA')!.id;
        console.log ("Metodos " , this.seleccionados);
        
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

    console.log ("Antes");
    
    console.log("Posicion 0", this.seleccionados[0]);
    console.log("Posicion 1", this.seleccionados[1]);
    console.log("Posicion 2", this.seleccionados[2]);
    console.log("Posicion 3", this.seleccionados[3]);

    const [id, index] = selectedValue.split('-').map(Number);
    if (!isNaN(id)) {
      this.seleccionados[index] = id;
      console.log("Posicion 0", this.seleccionados[0]);
      console.log("Posicion 1", this.seleccionados[1]);
      console.log("Posicion 2", this.seleccionados[2]);
      console.log("Posicion 3", this.seleccionados[3]);
      this.idsComidasSeleccionas.emit(this.seleccionados);
    }

  }



}
