import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { DashboardRoutingModule } from './Dashboard.Routing.Module';

@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {}
