import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../lib/utils';

@Component({
  selector: 'app-card-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-footer.html',
  styleUrls: ['./card-footer.css']
})
export class CardFooterComponent {
  @Input() class: string = '';

  get computedClass() {
    return cn("card-footer-base", this.class);
  }
}
