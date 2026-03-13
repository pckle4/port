import { Component, OnInit, OnDestroy, PLATFORM_ID, inject, Injectable, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { cn } from '../../../lib/utils';

@Injectable({ providedIn: 'root' })
export class NavbarStateService {
  isScrolled = false;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, OnDestroy {
  isVisible = true;
  isScrolled = false;
  private lastScrollY = 0;
  private ticking = false;
  private platformId = inject(PLATFORM_ID);
  private navbarState = inject(NavbarStateService);
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);
  private scrollHandler?: () => void;

  get headerClass() {
    return cn(
      "fixed top-4 left-0 right-0 z-50 mx-auto transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]",
      "will-change-[transform,opacity,max-width,width]",
      this.isScrolled ? "max-w-fit" : "w-[92%] md:w-[85%] max-w-4xl",
      this.isVisible ? "translate-y-0 opacity-100" : "-translate-y-[200%] opacity-0"
    );
  }

  get innerClass() {
    return cn(
      "rounded-full border transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] px-6 sm:px-8",
      this.isScrolled
        ? "bg-white/70 dark:bg-black/60 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-white/5 border-black/5 dark:border-white/5 py-1"
        : "bg-transparent backdrop-blur-none border-transparent shadow-none py-2"
    );
  }

  private updateNavbar = () => {
    const currentScrollY = window.scrollY;
    const scrolled = currentScrollY > 50;

    let changed = false;

    if (this.isScrolled !== scrolled) {
      this.isScrolled = scrolled;
      this.navbarState.isScrolled = scrolled;
      changed = true;
    }

    const newVisible = !(currentScrollY > this.lastScrollY && currentScrollY > 100);
    if (this.isVisible !== newVisible) {
      this.isVisible = newVisible;
      changed = true;
    }

    this.lastScrollY = currentScrollY;
    this.ticking = false;

    if (changed) {
      this.ngZone.run(() => this.cdr.markForCheck());
    }
  };

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const onScroll = () => {
      if (!this.ticking) {
        this.ticking = true;
        requestAnimationFrame(this.updateNavbar);
      }
    };

    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', onScroll, { passive: true });
      this.scrollHandler = () => window.removeEventListener('scroll', onScroll);
    });
  }

  ngOnDestroy() {
    this.scrollHandler?.();
  }
}
