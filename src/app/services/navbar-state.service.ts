import { Injectable, signal, PLATFORM_ID, inject, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** Scroll thresholds for navbar behavior */
const SCROLL_CONDENSE_THRESHOLD = 56;
const SCROLL_HIDE_THRESHOLD = 160;
const SCROLL_HIDE_DELTA = 18;
const SCROLL_SHOW_DELTA = -10;

export type ScrollDirection = 'up' | 'down' | 'none';

@Injectable({ providedIn: 'root' })
export class NavbarStateService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);

  /** Whether user has scrolled past the condense threshold (navbar shrinks) */
  readonly isCondensed = signal(false);

  /** Whether navbar is visible */
  readonly isVisible = signal(true);

  /** Current scroll direction */
  readonly scrollDirection = signal<ScrollDirection>('none');

  /** Last scroll Y for velocity calculation */
  private lastScrollY = 0;
  private lastScrollTime = 0;
  private ticking = false;
  private rafId: number | null = null;
  private scrollUnsubscribe?: () => void;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => this.setupScrollListener());
    }
  }

  private setupScrollListener(): void {
    const onScroll = (): void => {
      if (this.ticking) return;
      this.ticking = true;
      this.rafId = requestAnimationFrame(() => this.updateFromScroll());
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    this.scrollUnsubscribe = () => {
      window.removeEventListener('scroll', onScroll);
      if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    };
  }

  private updateFromScroll(): void {
    this.ticking = false;
    this.rafId = null;

    const scrollY = window.scrollY;
    const now = performance.now();

    // Direction (with velocity)
    const deltaY = scrollY - this.lastScrollY;
    const deltaTime = Math.max(1, now - this.lastScrollTime);
    const velocity = deltaY / deltaTime;

    const direction: ScrollDirection =
      Math.abs(velocity) < 0.5 ? 'none' : velocity > 0 ? 'down' : 'up';
    this.scrollDirection.set(direction);

    this.lastScrollY = scrollY;
    this.lastScrollTime = now;

    // Condensed state (navbar shrinks)
    const condensed = scrollY > SCROLL_CONDENSE_THRESHOLD;
    if (this.isCondensed() !== condensed) {
      this.ngZone.run(() => this.isCondensed.set(condensed));
    }

    // Keep navbar stable on laptop/desktop; only auto-hide on small screens.
    const isMobileViewport = window.matchMedia('(max-width: 767px)').matches;
    let visible = true;

    if (isMobileViewport) {
      if (scrollY <= SCROLL_HIDE_THRESHOLD) {
        visible = true;
      } else if (deltaY > SCROLL_HIDE_DELTA && direction === 'down') {
        visible = false;
      } else if (deltaY < SCROLL_SHOW_DELTA || direction === 'up') {
        visible = true;
      } else {
        visible = this.isVisible();
      }
    }

    if (this.isVisible() !== visible) {
      this.ngZone.run(() => this.isVisible.set(visible));
    }
  }

  /** Cleanup when service is destroyed (e.g. in tests) */
  destroy(): void {
    this.scrollUnsubscribe?.();
  }
}
