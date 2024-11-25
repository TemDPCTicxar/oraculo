import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/Services/AuthService';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// import * as data from '../../../../../data.json'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;

  // cards = (data as any).default

  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (userCredential) => {
          this.authService.getCurrentUser().subscribe(resp => {

            this.authService.storeUserData(resp);

            this.router.navigate(['/dashboard']).then(() => {
              Swal.fire({
                title: '¡Inicio de sesión exitoso!',
                text: 'Bienvenido de nuevo.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
            });
          })
        },
        error: (error) => {
          console.error('Error al iniciar sesión: ', error);
          Swal.fire({
            title: 'Error',
            text: 'sus creadenciales no son validas',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    } 
  }

  // addCards(){
  //   this.authService.addCards(this.cards);
  // }
}
