import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../lib/utils';

@Component({
  selector: 'app-card-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-header.html',
  styleUrls: ['./card-header.css']
})
export class CardHeaderComponent {
  @Input() class: string = '';

  get computedClass() {
    return cn("card-header-base", this.class);
  }
}
