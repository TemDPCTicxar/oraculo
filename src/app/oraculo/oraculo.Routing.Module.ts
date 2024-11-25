import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LecturaCartasComponent } from './components/lectura-carta/lectura-carta.component';
import { SeleccionarCartaComponent } from './components/seleccionar-carta/seleccionar-carta.component';
import { HistorialComponent } from './components/historial/historial.component';

const routes: Routes = [
  { path: '', component: SeleccionarCartaComponent },
  { path: 'lectura/:numero', component: LecturaCartasComponent },
  { path: 'historial', component: HistorialComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OraculoRoutingModule { }
