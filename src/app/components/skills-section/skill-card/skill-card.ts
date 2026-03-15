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
    return `radial-gradient(600px circle at ${this.mouseX}px ${this.mouseY}px, rgba(6, 182, 212, 0.18), transparent 40%)`;
  }

  get borderGradient() {
    return `radial-gradient(600px circle at ${this.mouseX}px ${this.mouseY}px, rgba(255, 255, 255, 0.08), transparent 40%)`;
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
