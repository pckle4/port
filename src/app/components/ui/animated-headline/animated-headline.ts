import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  inject,
  NgZone,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-animated-headline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animated-headline.html',
  styleUrls: ['./animated-headline.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'inline-block'
  }
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
  private timers: ReturnType<typeof setTimeout>[] = [];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.displayText = this.words[0] || '';
      this.cdr.markForCheck();

      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.prefersReducedMotion = mq.matches;

      if (!this.prefersReducedMotion && this.words.length > 0) {
        this.schedule(() => {
          this.isDeleting = true;
          this.tick();
        }, 2200);
      }
    }
  }

  private tick() {
    const word = this.words[this.currentIndex];
    
    // Smooth realistic human typing variation
    // Typing is slower, deleting is faster
    const baseTypingSpeed = 55;
    const baseDeletingSpeed = 25;
    
    // Add realistic jitter (occasional brief pauses for typing)
    const typingJitter = Math.random() > 0.85 ? 40 : (Math.random() * 15 - 5);
    const deletingJitter = Math.random() * 8;
    
    const speed = this.isDeleting 
        ? Math.max(10, baseDeletingSpeed + deletingJitter) 
        : Math.max(30, baseTypingSpeed + typingJitter);

    // Word fully typed → show highlight, then start deleting
    if (!this.isDeleting && this.displayText === word) {
      this.showHighlight = true;
      this.cdr.markForCheck();

      this.schedule(() => {
        this.showHighlight = false;
        this.cdr.markForCheck();

        this.schedule(() => {
          this.isDeleting = true;
          this.tick();
        }, 300); // Wait slightly after highlight disappears before deleting
      }, 1800); // Time to hold highlight
      return;
    }

    // Word fully deleted → move to next
    if (this.isDeleting && this.displayText === '') {
      this.isDeleting = false;
      this.currentIndex = (this.currentIndex + 1) % this.words.length;
      this.cdr.markForCheck();
      this.schedule(() => this.tick(), 300); // Brief pause before typing next word
      return;
    }

    this.displayText = this.isDeleting
      ? word.substring(0, this.displayText.length - 1)
      : word.substring(0, this.displayText.length + 1);
    this.cdr.markForCheck();

    this.schedule(() => this.tick(), speed);
  }

  /** Schedule fn in setTimeout outside Angular zone; re-enter zone before executing. */
  private schedule(fn: () => void, delay: number) {
    this.ngZone.runOutsideAngular(() => {
      const t = setTimeout(() => this.ngZone.run(fn), delay);
      this.timers.push(t);
    });
  }

  ngOnDestroy() {
    this.timers.forEach(clearTimeout);
    this.timers = [];
  }
}
