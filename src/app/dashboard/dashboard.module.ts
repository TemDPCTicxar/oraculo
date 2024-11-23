import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { DashboardRoutingModule } from './Dashboard.Routing.Module';
import { UserInfoComponent } from './components/user-info/user-info.component';

@NgModule({
  declarations: [
    MainComponent, UserInfoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {}
