import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from '../../../core/services/registro/registro.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro-cliente',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatIcon,
    MatProgressSpinnerModule
  ],
  templateUrl: './registro-cliente.component.html',
  styleUrl: './registro-cliente.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistroClienteComponent {
  registerForm: FormGroup;
  selectedFile: File | null = null; // Para almacenar la imagen seleccionada
  isSubmitting = false;
  private _snackBar = inject(MatSnackBar);

  constructor(private fb: FormBuilder, private registroService: RegistroService, private cdr: ChangeDetectorRef) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(16), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      apellido: ['', [Validators.required, Validators.maxLength(16), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/),Validators.maxLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]]
    });
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput?.files?.length) {
      this.selectedFile = fileInput.files[0];
    }
  }


  hide = signal(true);
  clickEvent(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.hide.set(!this.hide());
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Cerrar", {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 6000,
    });
  }

  validateForm() {
    Object.keys(this.registerForm.controls).forEach((field) => {
      const control = this.registerForm.get(field);
      if (control) {
        control.markAsTouched({ onlySelf: true }); // Marca los campos como "tocados"
      }
    });
  }
  

  onSubmit() {
    this.isSubmitting = true;
    this.validateForm();
    if (this.registerForm.valid) {
      const formData = new FormData();
      formData.append('nombre', this.registerForm.value.nombre);
      formData.append('apellido', this.registerForm.value.apellido);
      formData.append('dni', this.registerForm.value.dni);
      formData.append('email', this.registerForm.value.email);
      formData.append('clave', this.registerForm.value.clave);
      if (this.selectedFile) {
        formData.append('foto', this.selectedFile, this.selectedFile.name);
      }
      this.sendRequest(formData);
    }
  }
  
  private sendRequest(formData: FormData) {
    this.registroService.register(formData).subscribe(
      (response) => {
        this.isSubmitting = false;
        this.cdr.detectChanges();   // Forzar la detección de cambios
        this.openSnackBar('Registro exitoso');
      },
      (error) => {
        this.isSubmitting = false;
        this.cdr.detectChanges();   // Forzar la detección de cambios
        this.openSnackBar(error.error.message);
      }
    );
  }
  

  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
    if (control?.hasError('required')) {
      return `El campo ${controlName} es obligatorio.`;
    }
    if (control?.hasError('maxlength')) {
      const maxLength = control.errors?.['maxlength']?.requiredLength;
      const campo = controlName === 'dni' ? 'DNI' : controlName;
      return `${campo} debe tener como máximo ${maxLength} caracteres.`;
    }
    if (control?.hasError('pattern')) {
      if (controlName === 'dni')
        return 'El DNI debe contener solo números y tener 8 dígitos.';
      return `${controlName} debe contener solo letras.`;
    }
    if (control?.hasError('email')) {
      return 'Ingresa un correo electrónico válido.';
    }
    if (control?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 6 caracteres.';
    }
    return '';
  }
  
}
