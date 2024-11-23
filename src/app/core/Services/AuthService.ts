import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { catchError, finalize, from, Observable, switchMap, throwError, take } from 'rxjs';
import { LoadingService } from './LoadingService';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private loadingService: LoadingService
  ) {}

  addCards(cards: any[]): void {
    cards.forEach(card => {
      this.firestore.collection('cards').add(card)
        .then(() => {
          console.log(`Carta con ID ${card.id} agregada exitosamente.`);
        })
        .catch((error) => {
          console.error('Error al agregar carta:', error);
        });
    });
  }

  // Obtener información del usuario autenticado
  getCurrentUser(): Observable<any> {
    this.loadingService.setLoading(true);
    return this.afAuth.authState.pipe(
      take(1), // Solo tomamos el estado inicial
      switchMap(user => {
        if (user) {
          return this.firestore.collection('users').doc(user.uid).valueChanges();
        } else {
          return throwError(() => new Error('No hay usuario autenticado.'));
        }
      }),
      catchError(error => {
        console.error('Error obteniendo usuario:', error);
        return throwError(() => error);
      }),
      finalize(() => this.loadingService.setLoading(false))
    );
  }

  storeUserData(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string
  ): Observable<void> {
    this.loadingService.setLoading(true);
    return new Observable((observer) => {
      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            this.firestore.collection('users').doc(user.uid).set({
              firstName,
              lastName,
              email,
              phone,
            })
            .then(() => {
              observer.next();
              observer.complete();
            })
            .catch(error => observer.error(error))
            .finally(() => this.loadingService.setLoading(false));
          }
        })
        .catch(error => {
          observer.error(error);
          this.loadingService.setLoading(false);
        });
    });
  }

  login(email: string, password: string): Observable<any> {
    this.loadingService.setLoading(true);
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      catchError(error => {
        console.error('Error al iniciar sesión:', error);
        return throwError(() => error);
      }),
      finalize(() => this.loadingService.setLoading(false))
    );
  }

  logout(): Observable<void> {
    this.loadingService.setLoading(true);
    return from(this.afAuth.signOut()).pipe(
      catchError(error => {
        console.error('Error al cerrar sesión:', error);
        return throwError(() => error);
      }),
      finalize(() => this.loadingService.setLoading(false))
    );
  }

  updateUserInfo(updatedUser: any): Observable<any> {
    this.loadingService.setLoading(true);
    return this.afAuth.authState.pipe(
      take(1), // Aseguramos que solo tomamos el primer valor del observable
      switchMap(user => {
        if (user) {
          const userDocRef = this.firestore.collection('users').doc(user.uid);
          return from(userDocRef.get()).pipe(
            switchMap(docSnapshot => {
              if (docSnapshot.exists) {
                return userDocRef.update(updatedUser);
              } else {
                return throwError(() => new Error('El documento del usuario no existe.'));
              }
            })
          );
        } else {
          return throwError(() => new Error('No hay usuario autenticado.'));
        }
      }),
      catchError(error => {
        console.error('Error actualizando usuario:', error);
        return throwError(() => error);
      }),
      finalize(() => this.loadingService.setLoading(false))
    );
  }
}
