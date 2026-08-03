import { Directive, Input, HostBinding } from '@angular/core';
import { cn } from '../../lib/utils';

@Directive({
  selector: '[appCardFooter]',
  standalone: true
})
export class CardFooterDirective {
  @Input() class: string = '';

  @HostBinding('class')
  get hostClass() {
    return cn("flex items-center p-6 pt-0", this.class);
  }
}
