import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CartaModalComponent } from './carta-modal/carta-modal.component';
import { LoadingService } from '../../../core/Services/LoadingService';
import { AuthService } from '../../../core/Services/AuthService';

@Component({
  selector: 'app-lectura-cartas',
  templateUrl: './lectura-carta.component.html',
  styleUrls: ['./lectura-carta.component.css'],
})
export class LecturaCartasComponent implements OnInit {
  cartasSeleccionadas: any[] = []; // Cartas seleccionadas al azar
  numCartas: number = 1; // Número de cartas a mostrar (por defecto 2)

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog, private loadingService: LoadingService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Obtener el número de cartas desde la URL
    this.route.params.subscribe((params) => {
      this.numCartas = +params['numero'] || 1;
      this.obtenerCartasAleatorias();
    });
  }

  // Obtener cartas aleatorias desde Firestore
  obtenerCartasAleatorias(): void {
    this.loadingService.setLoading(true); // Mostrar el spinner al comenzar la operación
    this.firestore
      .collection('cards')
      .valueChanges()
      .subscribe({
        next: (cartas: any[]) => {
          this.cartasSeleccionadas = this.seleccionarAleatorias(cartas, this.numCartas);
          this.guardarLectura(this.cartasSeleccionadas);
          this.loadingService.setLoading(false); // Ocultar el spinner cuando se complete la operación
        },
        error: (err) => {
          console.error('Error al obtener las cartas:', err);
          this.loadingService.setLoading(false); // Asegúrate de ocultar el spinner en caso de error
        }
      });
  }

  guardarLectura(cartasSeleccionadas: any[]): void {
    const record = {
      id: this.firestore.createId(),
      numberCard: this.numCartas,
      cartas: cartasSeleccionadas,
    };
    this.authService.registrarLectura(record).subscribe({
      next: () => {
        console.log('Registro guardado con éxito');
      },
      error: (error) => {
        console.error('Error al guardar el registro:', error);
      },
    });
  }

  // Función para seleccionar cartas aleatorias
  seleccionarAleatorias(cartas: any[], cantidad: number): any[] {
    const mezcladas = [...cartas].sort(() => Math.random() - 0.5);
    return mezcladas.slice(0, cantidad);
  }

  // Abrir modal al hacer clic en una carta
  abrirModal(carta: any): void {
    this.dialog.open(CartaModalComponent, {
      width: '400px',
      data: { carta },
    });
  }

  navigateToCarta() {
    this.router.navigate(['/carta']);
  }

}
