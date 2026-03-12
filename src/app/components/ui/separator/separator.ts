import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../lib/utils';

@Component({
  selector: 'app-separator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './separator.html',
  styleUrls: ['./separator.css']
})
export class SeparatorComponent {
  @Input() class: string = '';
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() decorative: boolean = true;

  get computedClass() {
    return cn(
      "separator-base",
      this.orientation === 'horizontal' ? "separator-horizontal" : "separator-vertical",
      this.class
    );
  }
}
