import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../lib/utils';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrls: ['./card.css']
})
export class CardComponent {
  @Input() class: string = '';

  get computedClass() {
    return cn("rounded-xl border bg-white/80 dark:bg-[#0a0a0a]/50 text-card-foreground shadow-sm border-slate-200/80 dark:border-border backdrop-blur-xl relative overflow-hidden", this.class);
  }
}
