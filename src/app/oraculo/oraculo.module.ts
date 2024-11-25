import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SeleccionarCartaComponent } from './components/seleccionar-carta/seleccionar-carta.component';
import { LecturaCartasComponent } from './components/lectura-carta/lectura-carta.component';
import { OraculoRoutingModule } from './oraculo.Routing.Module';
import { CartaModalComponent } from './components/lectura-carta/carta-modal/carta-modal.component';
import { HistorialComponent } from './components/historial/historial.component';

@NgModule({
  declarations: [
    SeleccionarCartaComponent, LecturaCartasComponent, CartaModalComponent, HistorialComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule,
    OraculoRoutingModule
  ],
})
export class OraculoModule {}
