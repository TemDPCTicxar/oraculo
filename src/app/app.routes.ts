import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { AuthGuard } from './core/Guards/auth.guard';
import { VerificGuard } from './core/Guards/verific.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [VerificGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [VerificGuard] },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'carta',
    canActivate: [AuthGuard],
    loadChildren: () => import('./oraculo/oraculo.module').then(m => m.OraculoModule)
  },
  { path: '**', redirectTo: 'login' },
];
