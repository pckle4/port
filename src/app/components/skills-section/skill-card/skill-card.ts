import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skill-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill-card.html',
  styleUrls: ['./skill-card.css']
})
export class SkillCardComponent {
  @Input({ required: true }) category!: any;

  @ViewChild('card') cardRef!: ElementRef<HTMLDivElement>;

  opacity = 0;
  mouseX = 0;
  mouseY = 0;

  get gradient() {
    return `radial-gradient(600px circle at ${this.mouseX}px ${this.mouseY}px, rgba(63, 157, 151, 0.2), transparent 40%)`;
  }

  get borderGradient() {
    return `radial-gradient(600px circle at ${this.mouseX}px ${this.mouseY}px, rgba(217, 140, 115, 0.14), transparent 40%)`;
  }

  onMouseMove(e: MouseEvent) {
    if (!this.cardRef) return;
    const rect = this.cardRef.nativeElement.getBoundingClientRect();
    this.mouseX = e.clientX - rect.left;
    this.mouseY = e.clientY - rect.top;
  }

  onMouseEnter() {
    this.opacity = 1;
  }

  onMouseLeave() {
    this.opacity = 0;
  }
}
