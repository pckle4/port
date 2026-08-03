import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../lib/utils';

@Component({
  selector: 'app-bone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bone.html',
  styleUrls: ['./bone.css']
})
export class BoneComponent {
  @Input() class: string = '';
  get computedClass() {
    return cn(
      'rounded-lg bg-slate-200/40 dark:bg-white/5 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent',
      this.class
    );
  }
}
