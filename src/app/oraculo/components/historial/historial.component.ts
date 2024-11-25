import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/Services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  registros: any[] = []; // Lista de registros del historial
  fechaFiltro: string = '';

  constructor(private authService: AuthService, private router: Router,) { }

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial(): void {
    this.authService.cargarHistorial().subscribe({
      next: (registros) => {
        console.log('Historial cargado:', registros);
        this.registros = registros;
      },
      error: (error) => {
        console.error('Error:', error.message);
      },
    });
  }

  filtrarPorFecha() {
    if (this.fechaFiltro) {
      const fechaSeleccionada = new Date(this.fechaFiltro);
      this.registros = this.registros.filter((registro: any) => {
        const fechaRegistro = new Date(registro.timestar);
        return fechaRegistro.toDateString() === fechaSeleccionada.toDateString();
      });
    } else {
      this.cargarHistorial(); // Si no se selecciona fecha, se cargan todos los registros
    }
  }

  navigateToCarta() {
    this.router.navigate(['/dashboard']);
  }
}


