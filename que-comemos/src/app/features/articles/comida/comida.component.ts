import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ComidaServiceService } from '../../../core/services/articles/comida-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-comida',
  imports: [ 
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule, MatSelectModule, MatInputModule
  ],
  templateUrl: './comida.component.html',
  styleUrl: './comida.component.css'
})
export class ComidaComponent {

  comidaError : string = "";
  isModeEdit : boolean = false;

  private formBuilder = inject(FormBuilder);
  private _snackBar = inject(MatSnackBar);

  constructor (private comidaService : ComidaServiceService , private router: Router) { }

  comidaForm = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    precio: ['' , [Validators.required]],
    tipo: ['', [Validators.required]],
  });

  registrarNuevaComida () {
    if (this.comidaForm.valid){
     this.comidaService.createComida(this.comidaForm.value).subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (error: any) => {
          this.comidaError = error;
          console.error(error);
        },
        complete: () => {
          console.info('Complete');
          this.router.navigate(['/']);
          this.openSnackBar('Se registro la comida Correctamente.');
          this.comidaForm.reset();
        }
      });
    }
    else{
      this.comidaForm.markAllAsTouched();
    }    
  }


  openSnackBar(message: string) {
    this._snackBar.open(message, "Cerrar", {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 6000,
    });
  }

  
  get nombre () {
    return this.comidaForm.controls.nombre;
  }

  get precio () {
    return this.comidaForm.controls.precio;
  }
  
  get tipo () {
    return this.comidaForm.controls.tipo;
  }

}
