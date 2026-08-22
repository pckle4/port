import { Component, OnInit, OnDestroy, AfterViewInit, inject, PLATFORM_ID, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { SectionRegistryService } from '../../services/section-registry.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { smoothScrollToWithRetry } from '../../lib/utils';
import gsap from 'gsap';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './hero-section.html',
  styleUrls: ['./hero-section.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'block'
  }
})
export class HeroSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  isLoaded = false;
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);
  private sectionRegistry = inject(SectionRegistryService);

  rollingWords = [
    'ENGINEER'.split(''),
    'CRAFTSMAN'.split(''),
    'STRATEGIST'.split('')
  ];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.sectionRegistry.register('home');
    }
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    // Handle Loading State
    setTimeout(() => {
      this.isLoaded = true;
      this.cdr.markForCheck();
    }, 0);

    // Scramble Effect for Specific Words
    this.ngZone.runOutsideAngular(() => {
      this.initScrambleEffect();
      this.initRollingText();
    });
  }

  private initRollingText() {
    const lines = document.querySelectorAll('.tube-container .line');
    if (!lines.length) return;

    gsap.set(lines, { perspective: 400, transformStyle: "preserve-3d" });

    const depth = -40; // small radius so characters stay near the box
    const transformOrigin = `50% 50% ${depth}px`;
    const animTime = 0.8; // increased for a slower, smoother roll

    // Set initial state
    lines.forEach(line => {
      gsap.set(line.querySelectorAll('.char'), { rotationX: 90, opacity: 0 });
    });

    const tl = gsap.timeline({ repeat: -1 });

    Array.from(lines).forEach((line) => {
      const chars = line.querySelectorAll('.char');
      
      // Animate word IN
      tl.to(chars, { 
        rotationX: 0, 
        opacity: 1, 
        stagger: 0.04, 
        duration: animTime, 
        ease: "expo.out", 
        transformOrigin 
      });

      // Stay for 5 seconds
      tl.to({}, { duration: 5 });

      // Animate word OUT
      tl.to(chars, { 
        rotationX: -90, 
        opacity: 0, 
        stagger: 0.04, 
        duration: animTime, 
        ease: "expo.in", 
        transformOrigin 
      });
    });
  }

  private initScrambleEffect() {
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    const scrambleElements = document.querySelectorAll('.scramble-hover');

    scrambleElements.forEach((el: Element) => {
      const htmlEl = el as HTMLElement;
      const originalText = htmlEl.getAttribute('data-text') || htmlEl.innerText;

      htmlEl.addEventListener('mouseenter', () => {
        let iterations = 0;
        clearInterval((htmlEl as any)._scrambleInterval);
        (htmlEl as any)._scrambleInterval = setInterval(() => {
          htmlEl.innerText = originalText.split('')
            .map((letter: string, index: number) => {
              if (index < iterations) return originalText[index];
              return chars[Math.floor(Math.random() * chars.length)];
            }).join('');
          if (iterations >= originalText.length) {
            clearInterval((htmlEl as any)._scrambleInterval);
            htmlEl.innerText = originalText;
          }
          iterations += 1 / 3;
        }, 30);
      });

      htmlEl.addEventListener('mouseleave', () => {
        clearInterval((htmlEl as any)._scrambleInterval);
        htmlEl.innerText = originalText;
      });
    });
  }

  scrollToProjects() {
    this.sectionRegistry.loadAllSections();
    smoothScrollToWithRetry('projects', { duration: 1500 });
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      this.sectionRegistry.unregister('home');
    }
  }
}
