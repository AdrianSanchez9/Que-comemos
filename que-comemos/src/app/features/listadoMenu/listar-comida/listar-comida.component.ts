import { Component, OnInit } from '@angular/core';
import { ComidaServiceService } from '../../../core/services/articles/comida-service.service';
import { CommonModule } from '@angular/common';

import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-comida',
  imports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule
  ],
  templateUrl: './listar-comida.component.html',
  styleUrl: './listar-comida.component.css'
})
export class ListarComidaComponent implements OnInit{

  comidas : any[] = [];

  constructor (private comidaService : ComidaServiceService, private router: Router){ }

  ngOnInit(): void {
      this.comidaService.getComidas().subscribe({
        next : (response) => {
          this.comidas = response;

          this.comidas.forEach( (comida) => {
            if (comida.tipo == "PLATO_PRINCIPAL") {
              comida.tipo = "PLATO PRINCIPAL";
            }
          });
        },
        error : (error ) => {
          console.error ("Error: " , error)
        }
      })
  }

  editarComida (id : number) {
    this.router.navigate(['/comida/editar-comida', id]);
  }

}
