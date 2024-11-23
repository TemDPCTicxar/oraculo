import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { UserInfoComponent } from './components/user-info/user-info.component';


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'info-user', component: UserInfoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
