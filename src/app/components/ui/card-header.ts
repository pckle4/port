import { Directive, Input, HostBinding } from '@angular/core';
import { cn } from '../../lib/utils';

@Directive({
  selector: '[appCardHeader]',
  standalone: true
})
export class CardHeaderDirective {
  @Input() class: string = '';

  @HostBinding('class')
  get hostClass() {
    return cn("flex flex-col space-y-1.5 p-6", this.class);
  }
}
