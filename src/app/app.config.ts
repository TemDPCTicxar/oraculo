import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/Interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),
  importProvidersFrom(
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ),
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true // Asegura que se agregue al array de interceptores
  }
  ]
};
