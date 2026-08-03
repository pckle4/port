import { Directive, Input, HostBinding } from '@angular/core';
import { cn } from '../../lib/utils';

@Directive({
  selector: '[appCardDescription]',
  standalone: true
})
export class CardDescriptionDirective {
  @Input() class: string = '';

  @HostBinding('class')
  get hostClass() {
    return cn("text-sm text-muted-foreground", this.class);
  }
}
