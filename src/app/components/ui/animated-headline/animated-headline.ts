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
    // Natural speed variation — smaller jitter for smoother feel
    const jitter = Math.random() * 18;
    const speed = this.isDeleting ? 32 + jitter : 68 + jitter;

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
        }, 380);
      }, 2000);
      return;
    }

    // Word fully deleted → move to next
    if (this.isDeleting && this.displayText === '') {
      this.isDeleting = false;
      this.currentIndex = (this.currentIndex + 1) % this.words.length;
      this.cdr.markForCheck();
      this.schedule(() => this.tick(), 230);
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
