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
    return cn("input-base", this.class);
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  }
}
