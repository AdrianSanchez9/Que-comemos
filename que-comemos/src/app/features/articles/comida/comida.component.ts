import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ComidaServiceService } from '../../../core/services/articles/comida-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-comida',
  imports: [ 
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './comida.component.html',
  styleUrl: './comida.component.css'
})
export class ComidaComponent {

  comidaError : string = "";
  isModeEdit : boolean = false;

  private formBuilder = inject(FormBuilder);

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
          this.comidaForm.reset();
        }
      });
    }
    else{
      this.comidaForm.markAllAsTouched();
    }    
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
