import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { catchError, from, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }


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
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.collection('users').doc(user.uid).valueChanges(); // Obtiene los datos del usuario desde Firestore
        } else {
          return new Observable<any>(); // Si no hay usuario, devuelve un Observable vacío
        }
      })
    );
  }

  // Almacenar el usuario en localStorage después de login
  storeUserData(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string
  ): Observable<void> {
    return new Observable((observer) => {
      this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            this.firestore
              .collection('users')
              .doc(user.uid)
              .set({
                firstName,
                lastName,
                email,
                phone,
              })
              .then(() => {
                observer.next();
                observer.complete();
              })
              .catch((error) => {
                observer.error(error);
              });
          }
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  // Iniciar sesión de un usuario con email y contraseña
  login(email: string, password: string): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      catchError(error => {
        // Captura y maneja el error, si ocurre alguno
        throw new Error(error.message);
      })
    );
  }

  // Método para cerrar sesión
  logout(): Observable<void> {
    return from(this.afAuth.signOut());
  }

}
