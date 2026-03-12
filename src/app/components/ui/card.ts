import { Directive, Input, HostBinding } from '@angular/core';
import { cn } from '../../lib/utils';

@Directive({
  selector: '[appCard]',
  standalone: true
})
export class CardDirective {
  @Input() class: string = '';

  @HostBinding('class')
  get hostClass() {
    return cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm bg-[#0a0a0a]/40 dark:bg-[#0a0a0a]/50 border-white/10 dark:border-white/5 backdrop-blur-xl relative overflow-hidden group",
      this.class
    );
  }
}
