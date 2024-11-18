import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/Services/AuthService';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, 
             private authService: AuthService, 
             private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { firstName, lastName, email, phone, password } = this.registerForm.value;

      this.authService.register(firstName, lastName, email, phone, password).subscribe({
        next: () => {
          this.router.navigate(['/login']).then(() => {
            Swal.fire({
              title: '¡Registro exitoso!',
              text: 'Tu cuenta ha sido creada con éxito. Ahora puedes iniciar sesión.',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
          });
        },
        error: () => {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al registrar tu cuenta. Intenta de nuevo.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }
  }
}
