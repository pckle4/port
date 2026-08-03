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
      "shrink-0 bg-border",
      this.orientation === 'horizontal' ? "h-[1px] w-full" : "h-full w-[1px]",
      this.class
    );
  }
}
