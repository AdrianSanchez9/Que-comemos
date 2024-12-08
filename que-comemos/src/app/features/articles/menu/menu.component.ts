import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../../../core/services/articles/menu.service';
import { MenuRequest } from '../../../core/services/articles/menuRequest';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MenuItemComponent
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
    comidas : this.formBuilder.array([], [Validators.required]),
  });

  constructor (private menuService : MenuService, private router : Router){ }

  get nombre () {
    return this.menuForm.controls.nombre;
  }

  get precio () {
    return this.menuForm.controls.precio;
  }

  createMenu () {
    if (this.menuForm.valid && this.validarTodasComidas()) {
      const enviarMenu = {
        menu : {
          nombre : this.menuForm.value.nombre,
          precio : this.menuForm.value.precio,
          tipoMenu : this.menuForm.value.tipoMenu
        },
        comidas : this.menuForm.value.comidas
      }


      this.menuService.createMenu(enviarMenu).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          this.menuError = error;
          console.error(error);
        },
        complete: () => {
          console.info('Complete');
          this.router.navigate(['/']);
          this.menuForm.reset();
        }
      })
    }
    else{
      this.menuError = "Deben completar todos los campos";
    }
  }

  numeroSeleccionado(ids: number[]): void {
      const comidasArray = this.menuForm.get('comidas') as FormArray;
      comidasArray.clear();
      
      ids.forEach(id => {
        comidasArray.push(this.formBuilder.control(id));
      });

      console.log(this.menuForm.value);
  }

  validarTodasComidas() : boolean {
    const comidasArray = this.menuForm.get('comidas') as FormArray;
    return comidasArray.length == 4;
  }

}
