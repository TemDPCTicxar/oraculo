import { Component } from '@angular/core';
import { LoadingService } from '../../core/Services/LoadingService';


@Component({
  selector: 'app-loading',
  template: `
    <div class="loading-overlay" *ngIf="isLoading$ | async">
      <div class="spinner"></div>
    </div>
  `,
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  isLoading$ = this.loadingService.isLoading;

  constructor(private loadingService: LoadingService) {}
}
