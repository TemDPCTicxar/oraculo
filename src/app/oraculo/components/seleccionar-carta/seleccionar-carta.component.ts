import { Component } from '@angular/core';

@Component({
  selector: 'app-seleccionar-carta',
  templateUrl: './seleccionar-carta.component.html',
  styleUrls: ['./seleccionar-carta.component.css'],
})
export class SeleccionarCartaComponent {
  selectedCards: number[] = []; // IDs de las cartas seleccionadas

  onCardSelect(cardId: number, event: any) {
    if (event.target.checked) {
      this.selectedCards.push(cardId);
    } else {
      this.selectedCards = this.selectedCards.filter((id) => id !== cardId);
    }
  }
}
