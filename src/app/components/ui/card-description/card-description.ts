import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../lib/utils';

@Component({
  selector: 'app-card-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-description.html',
  styleUrls: ['./card-description.css']
})
export class CardDescriptionComponent {
  @Input() class: string = '';

  get computedClass() {
    return cn("card-description-base", this.class);
  }
}
