import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastItemComponent } from '../toast-item/toast-item';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-toast-provider',
  standalone: true,
  imports: [CommonModule, ToastItemComponent],
  templateUrl: './toast-provider.html',
  styleUrls: ['./toast-provider.css']
})
export class ToastProviderComponent {
  toastService = inject(ToastService);
}
