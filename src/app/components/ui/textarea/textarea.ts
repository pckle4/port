import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../lib/utils';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './textarea.html',
  styleUrls: ['./textarea.css']
})
export class TextareaComponent {
  @Input() class: string = '';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() value: string = '';
  @Input() rows: number = 3;

  @Output() valueChange = new EventEmitter<string>();

  get computedClass() {
    return cn("textarea-base", this.class);
  }

  onInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  }
}
