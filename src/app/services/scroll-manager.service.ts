import { Injectable, NgZone, PLATFORM_ID, inject, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface ScrollData {
  scrollY: number;
  deltaY: number;
  direction: 1 | -1;
  progress: number;
  elapsed: number;
  isMobile: boolean;
}

export type ScrollCallback = (data: ScrollData) => void;

@Injectable({
  providedIn: 'root'
})
export class ScrollManagerService implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);

  private callbacks = new Set<ScrollCallback>();
  private rafId: number | null = null;

  private lastScrollY = 0;
  private lastTime = 0;
  private isMobile = false;
  private resizeHandler: (() => void) | null = null;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        this.lastScrollY = window.scrollY;
        this.lastTime = performance.now();
        this.checkMobile();
        
        this.resizeHandler = () => this.checkMobile();
        window.addEventListener('resize', this.resizeHandler, { passive: true });
        window.addEventListener('scroll', this.onNativeScroll, { passive: true });
      });
    }
  }

  private checkMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  register(cb: ScrollCallback): void {
    this.callbacks.add(cb);
  }

  unregister(cb: ScrollCallback): void {
    this.callbacks.delete(cb);
  }

  private onNativeScroll = (): void => {
    if (this.rafId === null) {
      this.rafId = requestAnimationFrame(this.tick);
    }
  };

  private tick = (now: number): void => {
    this.rafId = null;

    const scrollY = window.scrollY;
    const deltaY = scrollY - this.lastScrollY;
    
    // Calculate progress: max scrollable is documentHeight - windowHeight
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

    const elapsed = Math.max(1, now - this.lastTime); // avoid divide by zero

    const data: ScrollData = {
      scrollY,
      deltaY,
      direction: deltaY > 0 ? 1 : -1,
      progress,
      elapsed,
      isMobile: this.isMobile
    };

    this.lastScrollY = scrollY;
    this.lastTime = now;

    for (const cb of this.callbacks) {
      cb(data);
    }
  };

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.onNativeScroll);
      if (this.resizeHandler) {
        window.removeEventListener('resize', this.resizeHandler);
      }
      if (this.rafId !== null) {
        cancelAnimationFrame(this.rafId);
      }
    }
    this.callbacks.clear();
  }
}
