import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../lib/utils';

@Component({
  selector: 'app-card-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-content.html',
  styleUrls: ['./card-content.css']
})
export class CardContentComponent {
  @Input() class: string = '';

  get computedClass() {
    return cn("card-content-base", this.class);
  }
}
