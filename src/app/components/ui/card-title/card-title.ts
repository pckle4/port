import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../lib/utils';

@Component({
  selector: 'app-card-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-title.html',
  styleUrls: ['./card-title.css']
})
export class CardTitleComponent {
  @Input() class: string = '';

  get computedClass() {
    return cn("text-lg font-semibold leading-none tracking-tight", this.class);
  }
}
