import { Directive, Input, HostBinding } from '@angular/core';
import { cn } from '../../lib/utils';

@Directive({
  selector: '[appCardTitle]',
  standalone: true
})
export class CardTitleDirective {
  @Input() class: string = '';

  @HostBinding('class')
  get hostClass() {
    return cn("text-2xl font-semibold leading-none tracking-tight", this.class);
  }
}
