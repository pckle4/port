import { Component, ElementRef, OnDestroy, AfterViewInit, PLATFORM_ID, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { CardDirective } from '../ui/card';
import { CardContentDirective } from '../ui/card-content';
import { TechOrbitComponent } from '../tech-orbit/tech-orbit';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, CardDirective, CardContentDirective, TechOrbitComponent],
  templateUrl: './about-section.html',
  styleUrls: ['./about-section.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutSectionComponent implements AfterViewInit, OnDestroy {
  isVisible = signal(false);
  private observer?: IntersectionObserver;
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  coreValues = [
    { icon: 'brain', label: "Curiosity", color: "text-amber-400" },
    { icon: 'code', label: "Clean Code", color: "text-teal-500" },
    { icon: 'heart', label: "Passion", color: "text-indigo-500" },
    { icon: 'rocket', label: "Growth", color: "text-amber-500" },
  ];

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            this.isVisible.set(true);
            this.observer?.disconnect();
          }
        },
        { threshold: 0.1, rootMargin: "50px" }
      );
      this.observer.observe(this.el.nativeElement);
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
