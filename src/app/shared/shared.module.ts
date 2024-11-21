import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [LoadingComponent, FooterComponent, HeaderComponent],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingComponent, FooterComponent, HeaderComponent // Exporta si se usará en otros módulos
  ]
})
export class SharedModule { }
