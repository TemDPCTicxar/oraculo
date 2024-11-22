import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { NgIf } from '@angular/common';

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

  constructor(private router: Router) {}

  isLoginOrRegister(): boolean {
    const currentRoute = this.router.url; // Obtener la ruta actual
    return currentRoute === '/login' || currentRoute === '/register'; // Comparar con las rutas deseadas
  }
}
