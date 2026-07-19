import { Component, ElementRef, OnDestroy, AfterViewInit, PLATFORM_ID, inject, ChangeDetectionStrategy, signal } from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { TechOrbitComponent } from '../tech-orbit/tech-orbit';
import { animate, stagger } from 'animejs';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, TechOrbitComponent],
  templateUrl: './about-section.html',
  styleUrls: ['./about-section.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutSectionComponent implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private observer: IntersectionObserver | null = null;

  coreValues = [
    { icon: 'brain', label: "Curiosity", color: "text-primary" },
    { icon: 'code', label: "Clean Code", color: "text-[hsl(var(--dusty-lavender))]" },
    { icon: 'heart', label: "Passion", color: "text-accent" },
    { icon: 'rocket', label: "Growth", color: "text-[hsl(var(--light-coral))]" },
  ];

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const hostEl = this.el.nativeElement;
    const elements = Array.from(hostEl.querySelectorAll('.about-anime-element')) as HTMLElement[];

    if (!elements.length) return;

    // Set initial state
    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
    });

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animate(elements, {
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 1000,
              delay: stagger(150),
              easing: 'easeOutExpo',
              complete: () => {
                elements.forEach(el => el.style.transform = '');
              }
            });
            if (this.observer) {
              this.observer.disconnect();
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    this.observer.observe(hostEl);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

