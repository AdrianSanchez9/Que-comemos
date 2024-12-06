import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../../../core/services/articles/menu.service';
import { MenuRequest } from '../../../core/services/articles/menuRequest';

@Component({
  selector: 'app-menu',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  menuError : string = "";

  private formBuilder = inject(FormBuilder);

  menuForm = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    precio: ['', [Validators.required]],
    tipoMenu: ['Vegetariano'],
  });

  constructor (private menuService : MenuService){ }

  get nombre () {
    return this.menuForm.controls.nombre;
  }

  get precio () {
    return this.menuForm.controls.precio;
  }

  createMenu () {
    if (this.menuForm.valid){

      this.menuService.createMenu(this.menuForm.value).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          this.menuError = error;
          console.error(error);
        },
        complete: () => {
          console.info('Complete');
        }
      })
    }
  }

}
