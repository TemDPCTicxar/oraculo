import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.afAuth.authState.pipe(
      take(1), // Solo toma el primer valor emitido
      map(user => !!user), // Devuelve true si hay un usuario autenticado
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          // Si no está autenticado, redirige a la página de login
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
