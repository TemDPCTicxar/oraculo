import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { AngularFireModule } from '@angular/fire/compat';

// Inicializa Firebase antes de bootstrap
AngularFireModule.initializeApp(environment.firebase);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
