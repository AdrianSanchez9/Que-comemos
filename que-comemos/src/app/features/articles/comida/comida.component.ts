import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ComidaServiceService } from '../../../core/services/articles/comida-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Observable } from 'rxjs';

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
  idComida : number = 0;


  private formBuilder = inject(FormBuilder);
  private _snackBar = inject(MatSnackBar);

  constructor (private comidaService : ComidaServiceService , private router: Router, private activatedRoute : ActivatedRoute) { }

  comidaForm = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    precio: ['' , [Validators.required]],
    tipo: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
          this.idComida = Number(params.get('id'));
    
          if(this.idComida !== 0 ){ 
            this.isModeEdit = true;
            this.updateMode();
          }
        });
  }

  updateMode (){
    this.comidaService.getComidasById(this.idComida!).subscribe({
      next: (response) => {
        this.comidaForm.patchValue({
          nombre : response.nombre,
          precio : response.precio,
          tipo : response.tipo
        });
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

   private handleComida(request: Observable<any>):void {
      request.subscribe({
        next: (response : any) => {
          console.log(response);
        },
        error: (error : any) => {
          this.comidaError = error;
          console.error(error);
        },
        complete: () => {
          console.info('Complete');
          this.router.navigate(['/list/comidas']);
          this.openSnackBar('Se registro la Comida Correctamente.');
          this.comidaForm.reset();
        }
      });
    } 
  
  
    sendComida () {
      console.log ("Antes") ; 
      if (this.comidaForm.valid ) {

        console.log ("Comida Actualizada" , this.comidaForm.value);  
        if (this.isModeEdit){
          this.handleComida(this.comidaService.updateComida(this.idComida!, this.comidaForm.value));
        }  
        else {
          this.handleComida(this.comidaService.createComida(this.comidaForm.value));
        }
      }
      else{
        this.comidaError = "Deben completar todos los campos";
      }
    }

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
          this.router.navigate(['/list/comida']);
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
