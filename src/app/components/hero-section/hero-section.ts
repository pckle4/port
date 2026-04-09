import { Component, OnInit, OnDestroy, AfterViewInit, inject, PLATFORM_ID, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef, NgZone } from '@angular/core';
import { SectionRegistryService } from '../../services/section-registry.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

import { FloatingIconsComponent } from '../ui/floating-icons/floating-icons';
import { AnimatedHeadlineComponent } from '../ui/animated-headline/animated-headline';
import { smoothScrollToWithRetry } from '../../lib/utils';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule,
    FloatingIconsComponent,
    AnimatedHeadlineComponent
  ],
  templateUrl: './hero-section.html',
  styleUrls: ['./hero-section.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroHost') heroHost!: ElementRef<HTMLElement>;

  isDesktop = false;
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);
  private sectionRegistry = inject(SectionRegistryService);
  private rafId: number | null = null;
  private boundMouseMove?: (e: MouseEvent) => void;

  dynamicWords = ["Full Stack Developer", "UI/UX Designer", "Problem Solver", "Creative Thinker"];

  socials = [
    { icon: 'github', href: "https://github.com/theanshshah", color: "text-foreground/70 hover:text-primary dark:text-foreground/70 dark:hover:text-primary transition-colors duration-300", label: "GitHub Profile" },
    { icon: 'linkedin', href: "https://linkedin.com/in/anshshahh", color: "text-foreground/70 hover:text-accent dark:text-foreground/70 dark:hover:text-accent transition-colors duration-300", label: "LinkedIn Profile" },
    { icon: 'mail', href: "mailto:theanshshah@gmail.com", color: "text-[hsl(var(--light-coral))] hover:text-accent dark:text-[hsl(var(--light-coral))] dark:hover:text-accent transition-colors duration-300", label: "Send Email" }
  ];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDesktop = window.innerWidth >= 768;
      this.cdr.markForCheck();
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.sectionRegistry.register('home');
    }
    if (!isPlatformBrowser(this.platformId) || !this.isDesktop) return;
    const el = this.heroHost?.nativeElement;
    if (!el) return;

    let pendingX = 0;
    let pendingY = 0;

    this.boundMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      pendingX = (e.clientX - rect.left - rect.width / 2) / 50;
      pendingY = (e.clientY - rect.top - rect.height / 2) / 50;
      if (this.rafId !== null) return;
      this.rafId = requestAnimationFrame(() => {
        this.rafId = null;
        el.style.setProperty('--parallax-x', `${pendingX}px`);
        el.style.setProperty('--parallax-y', `${pendingY}px`);
      });
    };

    this.ngZone.runOutsideAngular(() => {
      el.addEventListener('mousemove', this.boundMouseMove!, { passive: true });
    });
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      this.sectionRegistry.unregister('home');
    }
    if (isPlatformBrowser(this.platformId) && this.heroHost?.nativeElement && this.boundMouseMove) {
      this.heroHost.nativeElement.removeEventListener('mousemove', this.boundMouseMove);
    }
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
  }

  scrollToProjects() {
    this.sectionRegistry.loadAllSections();
    smoothScrollToWithRetry('projects');
  }

  scrollToAbout() {
    this.sectionRegistry.loadAllSections();
    smoothScrollToWithRetry('about');
  }
}

