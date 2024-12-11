import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../../../core/services/articles/menu.service';
import { MenuRequest } from '../../../core/services/articles/menuRequest';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { ActivatedRoute, ParamMap ,Router } from '@angular/router';
import { Observable } from 'rxjs';

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
export class MenuComponent implements OnInit {
  
  menuError : string = "";

  idMenu! : number;
  isModeEdit : boolean = false;

  private formBuilder = inject(FormBuilder);

  menuForm = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    precio: ['', [Validators.required]],
    tipoMenu: ['Vegetariano'],
    comidas : this.formBuilder.array([]),
  });

  constructor (private menuService : MenuService, private router : Router, private activatedRoute : ActivatedRoute){ }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.idMenu = Number(params.get('id'));

      if(this.idMenu !== 0 ){ 
        this.isModeEdit = true;
        this.updateMode();
      }
    });
  }

  get nombre () {
    return this.menuForm.controls.nombre;
  }

  get precio () {
    return this.menuForm.controls.precio;
  }

  updateMode () {
    // Llamo al servicio para obtener todos los datos del menu.
    this.menuService.getMenuById(this.idMenu!).subscribe({
      next: (response) => {
        console.log(response);
        this.menuForm.patchValue({
          nombre : response.nombre,
          precio : response.precio,
          tipoMenu : response.tipoMenu
        });
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

  private handleMenu(request: Observable<any>):void {
    request.subscribe({
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
    });
  } 


  sendMenu () {
    console.log ("Menu Form" , this.menuForm.valid);
    if (this.menuForm.valid && this.validarTodasComidas()) {
      const enviarMenu = {
        menu : {
          nombre : this.menuForm.value.nombre,
          precio : this.menuForm.value.precio,
          tipoMenu : this.menuForm.value.tipoMenu
        },
        comidas : this.menuForm.value.comidas
      }

      if (this.isModeEdit){
        this.handleMenu(this.menuService.updateMenu(this.idMenu!, enviarMenu));
      }  
      else {
        this.handleMenu(this.menuService.createMenu(enviarMenu));
      }
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
