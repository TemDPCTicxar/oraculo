import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/Services/AuthService';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userForm: FormGroup | any;
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  // Inicializa el formulario con los datos del usuario
  private initForm(): void {
    const user = this.getUserFromLocalStorage();

    this.userForm = this.fb.group({
      email: [{ value: user?.email || '', disabled: true }, [Validators.required, Validators.email]],
      name: [user?.firstName || '', [Validators.required, Validators.minLength(2)]],
      lastName: [user?.lastName || '', [Validators.required, Validators.minLength(2)]],
      phone: [
        user?.phone || '',
        [Validators.required, Validators.pattern('^[0-9]{10,15}$')] // Validación mejorada para números
      ]
    });
  }

  // Obtiene el usuario del localStorage y maneja casos de datos no válidos
  private getUserFromLocalStorage(): any {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user && user.email) {
        return user;
      } else {
        Swal.fire({
          title: 'Error',
          text: 'No se encontró información del usuario. Por favor, inicie sesión nuevamente.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        }).then(() => this.router.navigate(['/login']));
        return null;
      }
    } catch (error) {
      console.error('Error al obtener usuario de localStorage:', error);
      return null;
    }
  }

  // Actualiza la información del usuario
  updateUserInfo(): void {
    if (this.userForm.valid) {
      this.loading = true; // Activar estado de carga
      const updatedUser = {
        firstName: this.userForm.value.name.trim(),
        lastName: this.userForm.value.lastName.trim(),
        phone: this.userForm.value.phone.trim()
      };

      this.authService.updateUserInfo(updatedUser).subscribe({
        next: () => {
          this.loading = false; // Desactivar estado de carga
          Swal.fire({
            title: 'Éxito',
            text: 'La información del usuario se ha actualizado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => this.router.navigate(['/dashboard'])); // Opcional: redirección tras éxito
        },
        error: (error) => {
          this.loading = false; // Desactivar estado de carga
          console.error('Error al actualizar la información:', error);
          Swal.fire({
            title: 'Error',
            text: `Hubo un error al actualizar la información: ${error.message || error}`,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    } else {
      this.showValidationErrors();
    }
  }

  // Muestra alertas de validación
  private showValidationErrors(): void {
    const invalidFields = Object.keys(this.userForm.controls).filter(field =>
      this.userForm.get(field)?.invalid
    );

    const messages = invalidFields.map(field => {
      switch (field) {
        case 'name': return 'El nombre es obligatorio y debe tener al menos 2 caracteres.';
        case 'lastName': return 'El apellido es obligatorio y debe tener al menos 2 caracteres.';
        case 'phone': return 'El teléfono debe contener solo números y tener entre 10 y 15 dígitos.';
        default: return 'Hay errores en el formulario.';
      }
    });

    Swal.fire({
      title: 'Formulario inválido',
      html: messages.join('<br>'),
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    });
  }

  // Redirige al usuario al dashboard
  backPag(): void {
    this.router.navigate(['/dashboard']);
  }
}
