import { Component, OnInit, OnDestroy, AfterViewInit, inject, PLATFORM_ID, ChangeDetectionStrategy, ViewChild, ElementRef, signal, computed, effect, NgZone } from '@angular/core';
import { SiteDataService } from '../../services/site-data.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

import { FloatingIconsComponent } from '../ui/floating-icons/floating-icons';
import { AnimatedHeadlineComponent } from '../ui/animated-headline/animated-headline';
import { smoothScrollToWithRetry } from '../../lib/utils';
import { MagneticButtonDirective } from '../../core/directives/magnetic-button.directive';
import { RevealOnScrollDirective } from '../../core/directives/reveal-on-scroll.directive';
import { StackRevealDirective } from '../../core/directives/stack-reveal.directive';

// Import GSAP
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule,
    FloatingIconsComponent,
    AnimatedHeadlineComponent,
    MagneticButtonDirective,
    StackRevealDirective
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

  isDesktop = signal(false);
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private siteDataService = inject(SiteDataService);
  
  private boundMouseMove?: (e: MouseEvent) => void;
  private rectCache: DOMRect | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private ctx: gsap.Context | null = null;
  
  heroData = computed(() => this.siteDataService.data().hero);
  dynamicWords = computed(() => this.heroData().dynamicWords);
  socials = computed(() => this.heroData().socials);

  constructor() {
   
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDesktop.set(window.innerWidth >= 768);
    }
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    const el = this.heroHost?.nativeElement;
    if (!el) return;

    this.playEntranceAnimation(el);

    if (!this.isDesktop()) return;

    this.rectCache = el.getBoundingClientRect();
    this.resizeObserver = new ResizeObserver(() => {
      this.rectCache = el.getBoundingClientRect();
    });
    this.resizeObserver.observe(el);

    let rafId: number | null = null;

    this.boundMouseMove = (e: MouseEvent) => {
      if (!this.rectCache) return;
      const targetX = (e.clientX - this.rectCache.left - this.rectCache.width / 2) / 50;
      const targetY = (e.clientY - this.rectCache.top - this.rectCache.height / 2) / 50;
      
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        // The CSS variables are updated directly on the element via angular style bindings in HTML
        // But since we are outside Angular Zone, we can just update the style directly for maximum performance,
        // rather than triggering change detection via signals for every mouse move.
        // Actually, since the template uses `[style.--parallax-x]="parallaxX() + 'px'"`, 
        // updating signals outside zone won't immediately reflect unless we use `set` and trigger CD.
        // Let's stick to direct DOM manipulation for 60fps parallax without angular overhead.
        el.style.setProperty('--parallax-x', `${targetX}px`);
        el.style.setProperty('--parallax-y', `${targetY}px`);
      });
    };

    this.ngZone.runOutsideAngular(() => {
      el.addEventListener('mousemove', this.boundMouseMove!, { passive: true });
    });
  }

  private playEntranceAnimation(host: HTMLElement) {
    this.ctx = gsap.context(() => {
      // Premium GSAP entrance: smooth upward fade, staggered elements
      const elements = Array.from(host.querySelectorAll('.hero-anime-element')) as HTMLElement[];

      const tl = gsap.timeline();

      // Set initial states using autoAlpha for FOUC prevention
      gsap.set(elements, { autoAlpha: 0, y: 30 });

      // Cascade the remaining elements
      if (elements.length) {
        tl.to(elements, {
          autoAlpha: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.1,
          delay: 0.8, // Wait for StackReveal to be mostly done
          ease: 'expo.out'
        });
      }
    }, host);
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
    if (this.ctx) {
      this.ctx.revert(); // clean up GSAP animations
    }
  }

  scrollToProjects() {
    smoothScrollToWithRetry('projects');
  }

  scrollToAbout() {
    smoothScrollToWithRetry('about');
  }
}
