import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VerificGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => !!user), // Verifica si hay un usuario autenticado
      tap(isLoggedIn => {
        if (isLoggedIn) {
          this.router.navigate(['/dashboard']); // Redirige al dashboard si ya está logueado
        }
      }),
      map(isLoggedIn => !isLoggedIn) // Permite el acceso solo si NO está logueado
    );
  }
}
