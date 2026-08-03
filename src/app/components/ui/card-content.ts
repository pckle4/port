import { Directive, Input, HostBinding } from '@angular/core';
import { cn } from '../../lib/utils';

@Directive({
  selector: '[appCardContent]',
  standalone: true
})
export class CardContentDirective {
  @Input() class: string = '';

  @HostBinding('class')
  get hostClass() {
    return cn("p-6 pt-0", this.class);
  }
}
