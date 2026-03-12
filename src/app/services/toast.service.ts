import { Injectable, signal } from '@angular/core';

export type ToastVariant = 'success' | 'error' | 'info';

export interface ToastData {
  id: number;
  message: string;
  variant: ToastVariant;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastIdCounter = 0;
  toasts = signal<ToastData[]>([]);

  success(message: string) { this.addToast(message, 'success'); }
  error(message: string) { this.addToast(message, 'error'); }
  info(message: string) { this.addToast(message, 'info'); }

  private addToast(message: string, variant: ToastVariant) {
    const id = ++this.toastIdCounter;
    this.toasts.update(t => [...t, { id, message, variant }]);
  }

  dismiss(id: number) {
    this.toasts.update(t => t.filter(toast => toast.id !== id));
  }
}
