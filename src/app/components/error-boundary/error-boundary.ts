import { Component, Input, ErrorHandler, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-error-boundary',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './error-boundary.html',
  styleUrls: ['./error-boundary.css']
})
export class ErrorBoundaryComponent {
  @Input() hasError = false;

  reset() {
    this.hasError = false;
    window.location.reload();
  }
}

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.error('ErrorBoundary caught:', error);
  }
}
