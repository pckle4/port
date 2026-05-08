import { Component, ElementRef, OnDestroy, AfterViewInit, PLATFORM_ID, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { SectionRegistryService } from '../../services/section-registry.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { TechOrbitComponent } from '../tech-orbit/tech-orbit';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, TechOrbitComponent],
  templateUrl: './about-section.html',
  styleUrls: ['./about-section.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutSectionComponent implements AfterViewInit, OnDestroy {
  isVisible = signal(true);
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
    }
  }

  ngOnDestroy() {
    this.sectionRegistry.unregister('about');
  }
}

