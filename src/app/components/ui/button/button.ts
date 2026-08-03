import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../lib/utils';
import { LucideAngularModule } from 'lucide-angular';

export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './button.html',
  styleUrls: ['./button.css']
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'default';
  @Input() size: ButtonSize = 'default';
  @Input() class: string = '';
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() ariaLabel?: string;
  @Output() onClick = new EventEmitter<MouseEvent>();

  get computedClass() {
    const baseClass = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    let variantClass = "";
    switch (this.variant) {
      case 'default': variantClass = "bg-primary text-primary-foreground hover:bg-primary/90"; break;
      case 'destructive': variantClass = "bg-destructive text-destructive-foreground hover:bg-destructive/90"; break;
      case 'outline': variantClass = "border border-input bg-background hover:bg-accent hover:text-accent-foreground"; break;
      case 'secondary': variantClass = "bg-secondary text-secondary-foreground hover:bg-secondary/80"; break;
      case 'ghost': variantClass = "hover:bg-accent hover:text-accent-foreground"; break;
      case 'link': variantClass = "text-primary underline-offset-4 hover:underline"; break;
    }

    let sizeClass = "";
    switch (this.size) {
      case 'default': sizeClass = "h-10 px-4 py-2"; break;
      case 'sm': sizeClass = "h-9 rounded-md px-3"; break;
      case 'lg': sizeClass = "h-11 rounded-md px-8"; break;
      case 'icon': sizeClass = "h-10 w-10"; break;
    }

    return cn(baseClass, variantClass, sizeClass, this.class);
  }
}
