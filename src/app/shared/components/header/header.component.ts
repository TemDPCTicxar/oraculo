import { Component } from '@angular/core';
import { AuthService } from '../../../core/Services/AuthService';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen: boolean = false;

  constructor(
    private authService: AuthService,  // Servicio de autenticación
    private router: Router             // Para redirigir a la página de login
  ) { }

  // Alterna el estado del menú desplegable
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Función para cerrar sesión
  logout() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Cerrar sesión terminará tu sesión actual!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout().subscribe({
          next: () => {
            // Redirigir al login después de cerrar sesión
            this.router.navigate(['/login']).then(() => {
              Swal.fire({
                title: '¡Sesión cerrada!',
                text: 'Has cerrado sesión exitosamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
            });
          },
          error: (error) => {
            console.error('Error al cerrar sesión:', error);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al cerrar sesión. Por favor, inténtalo de nuevo.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        });
      }
    });
  }

}
