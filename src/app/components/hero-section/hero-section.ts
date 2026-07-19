import { Component, OnInit, OnDestroy, AfterViewInit, inject, PLATFORM_ID, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef, NgZone } from '@angular/core';
import { SiteDataService } from '../../services/site-data.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

import { FloatingIconsComponent } from '../ui/floating-icons/floating-icons';
import { AnimatedHeadlineComponent } from '../ui/animated-headline/animated-headline';
import { smoothScrollToWithRetry } from '../../lib/utils';
import { animate, stagger } from 'animejs';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'block'
  }
})
export class HeroSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroHost') heroHost!: ElementRef<HTMLElement>;

  isDesktop = false;
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);
  private siteDataService = inject(SiteDataService);
  private rafId: number | null = null;
  private boundMouseMove?: (e: MouseEvent) => void;
  private rectCache: DOMRect | null = null;
  private resizeObserver: ResizeObserver | null = null;
  
  heroData = this.siteDataService.data().hero;
  dynamicWords = this.heroData.dynamicWords;
  socials = this.heroData.socials;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDesktop = window.innerWidth >= 768;
      this.cdr.markForCheck();
    }
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    const el = this.heroHost?.nativeElement;
    if (!el) return;

    this.playEntranceAnimation(el);

    if (!this.isDesktop) return;

    // Cache the rect initially and update it on resize to prevent layout thrashing
    this.rectCache = el.getBoundingClientRect();
    this.resizeObserver = new ResizeObserver(() => {
      this.rectCache = el.getBoundingClientRect();
    });
    this.resizeObserver.observe(el);

    let pendingX = 0;
    let pendingY = 0;

    this.boundMouseMove = (e: MouseEvent) => {
      if (!this.rectCache) return;
      pendingX = (e.clientX - this.rectCache.left - this.rectCache.width / 2) / 50;
      pendingY = (e.clientY - this.rectCache.top - this.rectCache.height / 2) / 50;
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

  private playEntranceAnimation(host: HTMLElement) {
    const elements = Array.from(host.querySelectorAll('.hero-anime-element')) as HTMLElement[];
    if (!elements.length) return;

    // Set initial state
    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
    });

    // Play cinematic stagger
    animate(elements, {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 1200,
      delay: stagger(150, { start: 200 }),
      easing: 'easeOutExpo',
      complete: () => {
        elements.forEach(el => el.style.transform = '');
      }
    });
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.heroHost?.nativeElement) {
      if (this.boundMouseMove) {
        this.heroHost.nativeElement.removeEventListener('mousemove', this.boundMouseMove);
      }
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }
    }
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
  }

  scrollToProjects() {
    smoothScrollToWithRetry('projects');
  }

  scrollToAbout() {
    smoothScrollToWithRetry('about');
  }
}

