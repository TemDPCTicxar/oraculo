import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeleccionarCartaComponent } from './components/seleccionar-carta/seleccionar-carta.component';

const routes: Routes = [
  { path: '', component: SeleccionarCartaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OraculoRoutingModule {}
