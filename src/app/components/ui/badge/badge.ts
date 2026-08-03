import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../lib/utils';

export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.html',
  styleUrls: ['./badge.css']
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'default';
  @Input() class: string = '';

  get computedClass() {
    const baseClass = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

    let variantClass = "";
    switch (this.variant) {
      case 'default': variantClass = "border-transparent bg-primary text-primary-foreground hover:bg-primary/80"; break;
      case 'secondary': variantClass = "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"; break;
      case 'destructive': variantClass = "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80"; break;
      case 'outline': variantClass = "text-foreground"; break;
    }

    return cn(baseClass, variantClass, this.class);
  }
}
