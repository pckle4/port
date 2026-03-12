import { Component, Input, OnInit, OnDestroy, PLATFORM_ID, inject, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-animated-headline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animated-headline.html',
  styleUrls: ['./animated-headline.css']
})
export class AnimatedHeadlineComponent implements OnInit, OnDestroy {
  @Input() words: string[] = [];

  displayText = '';
  currentIndex = 0;
  isDeleting = false;
  showHighlight = false;
  prefersReducedMotion = false;

  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);
  private timers: any[] = [];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.displayText = this.words[0] || '';
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.prefersReducedMotion = mediaQuery.matches;

      if (!this.prefersReducedMotion && this.words.length > 0) {
        this.scheduleTimeout(() => {
          this.isDeleting = true;
          this.tick();
        }, 2000);
      }
    }
  }

  private tick() {
    const currentWord = this.words[this.currentIndex];

    const baseDeleteSpeed = 40;
    const baseTypeSpeed = 80;
    const jitter = Math.random() * 30;
    const typingSpeed = this.isDeleting
      ? baseDeleteSpeed + jitter
      : baseTypeSpeed + jitter;

    if (!this.isDeleting && this.displayText === currentWord) {
      this.showHighlight = true;
      this.cdr.detectChanges();

      this.scheduleTimeout(() => {
        this.showHighlight = false;
        this.cdr.detectChanges();

        this.scheduleTimeout(() => {
          this.isDeleting = true;
          this.tick();
        }, 350);
      }, 2200);
      return;
    }

    if (this.isDeleting && this.displayText === '') {
      this.isDeleting = false;
      this.currentIndex = (this.currentIndex + 1) % this.words.length;
      this.cdr.detectChanges();
      this.scheduleTimeout(() => this.tick(), 200);
      return;
    }

    if (this.isDeleting) {
      this.displayText = currentWord.substring(0, this.displayText.length - 1);
    } else {
      this.displayText = currentWord.substring(0, this.displayText.length + 1);
    }
    this.cdr.detectChanges();

    this.scheduleTimeout(() => this.tick(), typingSpeed);
  }

  private scheduleTimeout(fn: () => void, delay: number) {
    this.ngZone.runOutsideAngular(() => {
      const timer = setTimeout(() => {
        this.ngZone.run(fn);
      }, delay);
      this.timers.push(timer);
    });
  }

  ngOnDestroy() {
    this.timers.forEach(t => clearTimeout(t));
    this.timers = [];
  }
}
