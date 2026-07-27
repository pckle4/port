import { Component, OnInit, OnDestroy, AfterViewInit, inject, PLATFORM_ID, ChangeDetectionStrategy, ViewChild, ElementRef, signal, computed, NgZone, ChangeDetectorRef } from '@angular/core';
import { SiteDataService } from '../../services/site-data.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

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
  private cdr = inject(ChangeDetectorRef);
  private siteDataService = inject(SiteDataService);
  
  private boundMouseMove?: (e: MouseEvent) => void;
  private rectCache: DOMRect | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private ctx: gsap.Context | null = null;
  
  heroData = computed(() => this.siteDataService.data().hero);
  dynamicWords = computed(() => this.heroData().dynamicWords);
  socials = computed(() => this.heroData().socials);

  // --- Animated Headline State ---
  displayText = '';
  currentIndex = 0;
  isDeleting = false;
  showHighlight = false;
  prefersReducedMotion = false;
  private timers: ReturnType<typeof setTimeout>[] = [];

  // --- Floating Icons State ---
  floatingIcons = [
    { icon: 'file-json', color: "text-primary/40", top: "18%", left: "10%", delay: "0s", size: "w-6 h-6" },
    { icon: 'database', color: "text-accent/35", top: "55%", left: "88%", delay: "1.5s", size: "w-7 h-7" },
    { icon: 'braces', color: "text-secondary/40", top: "72%", left: "8%", delay: "0.5s", size: "w-5 h-5" },
    { icon: 'terminal', color: "text-muted-foreground/30", top: "15%", left: "78%", delay: "2s", size: "w-6 h-6" },
    { icon: 'git-branch', color: "text-accent/30", top: "40%", left: "5%", delay: "0.8s", size: "w-5 h-5" },
    { icon: 'cpu', color: "text-primary/35", top: "82%", left: "75%", delay: "1.2s", size: "w-6 h-6" },
    { icon: 'globe', color: "text-secondary/30", top: "30%", left: "92%", delay: "2.5s", size: "w-5 h-5" },
    { icon: 'layers', color: "text-primary/25", top: "60%", left: "18%", delay: "3s", size: "w-6 h-6" },
    { icon: 'shield', color: "text-accent/25", top: "85%", left: "45%", delay: "1.8s", size: "w-5 h-5" },
    { icon: 'zap', color: "text-secondary/30", top: "10%", left: "45%", delay: "3.5s", size: "w-4 h-4" },
  ];

  constructor() {
   
  }

  ngOnInit() {
    // Initialize for both server and client to prevent Hydration Mismatch
    this.displayText = this.dynamicWords()[0] || '';
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    const el = this.heroHost?.nativeElement;
    if (!el) return;

    this.playEntranceAnimation(el);

    // Now that hydration is complete, it's safe to evaluate client-side states
    setTimeout(() => {
      this.isDesktop.set(window.innerWidth >= 768);
      
      // Initialize typing effect safely on client
      this.initTypingEffect();

      if (!this.isDesktop()) return;

      this.rectCache = el.getBoundingClientRect();
      this.resizeObserver = new ResizeObserver(() => {
        this.rectCache = el.getBoundingClientRect();
      });
      this.resizeObserver.observe(el);
      
      this.setupParallax(el);
    }, 0);
  }

  private initTypingEffect() {
    this.cdr.markForCheck();
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.prefersReducedMotion = mq.matches;

    const words = this.dynamicWords();
    if (!this.prefersReducedMotion && words.length > 0) {
      this.schedule(() => {
        this.isDeleting = true;
        this.tick();
      }, 2200);
    }
  }

  private tick() {
    const words = this.dynamicWords();
    const word = words[this.currentIndex];
    
    const baseTypingSpeed = 55;
    const baseDeletingSpeed = 25;
    
    const typingJitter = Math.random() > 0.85 ? 40 : (Math.random() * 15 - 5);
    const deletingJitter = Math.random() * 8;
    
    const speed = this.isDeleting 
        ? Math.max(10, baseDeletingSpeed + deletingJitter) 
        : Math.max(30, baseTypingSpeed + typingJitter);

    if (!this.isDeleting && this.displayText === word) {
      this.showHighlight = true;
      this.cdr.markForCheck();

      this.schedule(() => {
        this.showHighlight = false;
        this.cdr.markForCheck();

        this.schedule(() => {
          this.isDeleting = true;
          this.tick();
        }, 300); 
      }, 1800); 
      return;
    }

    if (this.isDeleting && this.displayText === '') {
      this.isDeleting = false;
      this.currentIndex = (this.currentIndex + 1) % words.length;
      this.cdr.markForCheck();
      this.schedule(() => this.tick(), 300); 
      return;
    }

    this.displayText = this.isDeleting
      ? word.substring(0, this.displayText.length - 1)
      : word.substring(0, this.displayText.length + 1);
    this.cdr.markForCheck();

    this.schedule(() => this.tick(), speed);
  }

  private schedule(fn: () => void, delay: number) {
    this.ngZone.runOutsideAngular(() => {
      const t = setTimeout(() => this.ngZone.run(fn), delay);
      this.timers.push(t);
    });
  }

  private setupParallax(el: HTMLElement) {
    let rafId: number | null = null;

    this.boundMouseMove = (e: MouseEvent) => {
      if (!this.rectCache) return;
      const targetX = (e.clientX - this.rectCache.left - this.rectCache.width / 2) / 50;
      const targetY = (e.clientY - this.rectCache.top - this.rectCache.height / 2) / 50;
      
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
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

      // Cascade the elements
      if (elements.length) {
        tl.fromTo(elements,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.1,
            delay: 0.2, // Reduced delay so it doesn't feel stuck
            ease: 'expo.out',
            clearProps: 'transform' // Prevent lingering inline styles from breaking CSS
          }
        );

      }
    }, host);
  }

  ngOnDestroy() {
    this.timers.forEach(clearTimeout);
    this.timers = [];

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
