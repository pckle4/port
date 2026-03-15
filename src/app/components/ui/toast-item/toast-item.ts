import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastData, ToastVariant } from '../../../services/toast.service';
import { cn } from '../../../lib/utils';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-toast-item',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './toast-item.html',
  styleUrls: ['./toast-item.css']
})
export class ToastItemComponent implements OnInit, OnDestroy {
  @Input({ required: true }) data!: ToastData;
  @Output() dismiss = new EventEmitter<number>();

  exiting = false;
  private timer: any;

  get computedClass() {
    const bgClasses: Record<ToastVariant, string> = {
      success: 'border-teal-500/30 bg-teal-500/10 dark:bg-teal-500/20',
      error: 'border-rose-500/30 bg-rose-500/10 dark:bg-rose-500/20',
      info: 'border-cyan-500/30 bg-cyan-500/10 dark:bg-cyan-500/20',
    };

    return cn(
      'flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-md text-sm font-medium transition-all duration-300',
      bgClasses[this.data.variant],
      this.exiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100',
      'text-slate-700 dark:text-slate-200'
    );
  }

  get iconName() {
    switch (this.data.variant) {
      case 'success': return 'check-circle';
      case 'error': return 'alert-circle';
      case 'info': return 'info';
    }
  }

  get iconClass() {
    switch (this.data.variant) {
      case 'success': return 'w-4 h-4 text-teal-500';
      case 'error': return 'w-4 h-4 text-rose-500';
      case 'info': return 'w-4 h-4 text-cyan-500';
    }
  }

  ngOnInit() {
    this.timer = setTimeout(() => {
      this.close();
    }, 4000);
  }

  ngOnDestroy() {
    if (this.timer) clearTimeout(this.timer);
  }

  close() {
    this.exiting = true;
    setTimeout(() => this.dismiss.emit(this.data.id), 300);
  }
}

