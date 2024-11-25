import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VerificGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => !user), // Permite el acceso si no hay un usuario autenticado
      tap(isAllowed => {
        if (!isAllowed) {
          this.router.navigate(['/dashboard']); // Redirige al dashboard si el usuario ya está autenticado
        }
      })
    );
  }
}
