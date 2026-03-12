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
    return cn("card-base", this.class);
  }
}
