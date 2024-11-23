import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { NgIf } from '@angular/common';
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    AuthModule,
    SharedModule,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'oraculo';

  constructor(private router: Router) {

    FirebaseAnalytics.logEvent({
      name: 'app_started',  // Nombre del evento
      params: {             // Propiedades del evento
        platform: 'capacitor',
      }
    });

    console.log("Firebase Analytics initialized!");
  }

  isLoginOrRegister(): boolean {
    const currentRoute = this.router.url; // Obtener la ruta actual
    return currentRoute === '/login' || 
    currentRoute === '/register' || 
    currentRoute === '/login?returnUrl=%2Fdashboard';
  }
}
