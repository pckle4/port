import { Component, ElementRef, OnDestroy, AfterViewInit, PLATFORM_ID, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { SectionRegistryService } from '../../services/section-registry.service';
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
  private sectionRegistry = inject(SectionRegistryService);

  coreValues = [
    { icon: 'brain', label: "Curiosity", color: "text-primary" },
    { icon: 'code', label: "Clean Code", color: "text-[hsl(var(--dusty-lavender))]" },
    { icon: 'heart', label: "Passion", color: "text-accent" },
    { icon: 'rocket', label: "Growth", color: "text-[hsl(var(--light-coral))]" },
  ];

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.sectionRegistry.register('about');
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
    this.sectionRegistry.unregister('about');
    this.observer?.disconnect();
  }
}

