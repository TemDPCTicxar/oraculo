import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seleccionar-carta',
  templateUrl: './seleccionar-carta.component.html',
  styleUrls: ['./seleccionar-carta.component.css'],
})
export class SeleccionarCartaComponent {
  selectedCards: number[] = []; // IDs de las cartas seleccionadas

  constructor(private router: Router) {}

  onCardSelect(cardId: number, event: any) {
    if (event.target.checked) {
      this.selectedCards.push(cardId);
    } else {
      this.selectedCards = this.selectedCards.filter((id) => id !== cardId);
    }
  }

  continuar(): void {
    // Obtener el valor del radio button seleccionado
    const selectedRadio = document.querySelector(
      'input[name="carta"]:checked'
    ) as HTMLInputElement;

    if (selectedRadio) {
      const valorSeleccionado = selectedRadio.value; // Obtén el valor del input
      // Redirigir a la ruta correspondiente
      this.router.navigate([`/carta/lectura/${valorSeleccionado}`]);
    } else {
      // Mostrar un mensaje con SweetAlert2 si no hay selección
      Swal.fire({
        title: 'Atención',
        text: 'Por favor selecciona una carta antes de continuar.',
        icon: 'warning',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#0085C8',
      });
    }
  }
}
