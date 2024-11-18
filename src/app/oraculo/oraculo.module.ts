import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SeleccionarCartaComponent } from './components/seleccionar-carta/seleccionar-carta.component';
import { OraculoRoutingModule } from './oraculo.Routing.Module';

@NgModule({
  declarations: [
    SeleccionarCartaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    OraculoRoutingModule
  ]
})
export class OraculoModule {}
