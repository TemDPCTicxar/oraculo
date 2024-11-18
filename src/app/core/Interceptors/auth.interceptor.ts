import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private afAuth: AngularFireAuth) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.afAuth.idToken.pipe(
      switchMap(token => {
        // Si hay un token, lo agregamos a la cabecera de la solicitud
        if (token) {
          const clonedRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return next.handle(clonedRequest);
        } else {
          // Si no hay token, simplemente continuamos con la solicitud sin agregar nada
          return next.handle(req);
        }
      })
    );
  }
}
