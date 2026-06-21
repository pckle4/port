import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../lib/utils';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.html',
  styleUrls: ['./input.css']
})
export class InputComponent {
  @Input() type: string = 'text';
  @Input() class: string = '';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() value: string = '';

  @Output() valueChange = new EventEmitter<string>();

  get computedClass() {
    return cn("flex h-10 w-full rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-white/5 px-3 py-2 text-sm text-slate-800 dark:text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary dark:focus-visible:border-primary/80 disabled:cursor-not-allowed disabled:opacity-50 transition-colors", this.class);
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  }
}
