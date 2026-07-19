import {
  Component,
  AfterViewInit,
  OnDestroy,
  OnInit,
  inject,
  PLATFORM_ID,
  ChangeDetectionStrategy,
  signal,
  effect,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  NgZone,
  ChangeDetectorRef,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { animate } from 'animejs';
import { ScrollManagerService, ScrollData } from '../../services/scroll-manager.service';

export interface TabItem {
  name: string;
  link: string;
  id: string;
  icon: string;
}

const NAV_SECTIONS = ['home', 'about', 'skills', 'projects', 'contact'] as const;

@Component({
  selector: 'app-tab-bar',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './tab-bar.html',
  styleUrls: ['./tab-bar.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabBarComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly ngZone = inject(NgZone);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly scrollManager = inject(ScrollManagerService);

  @ViewChild('tabBarRef') tabBarRef!: ElementRef<HTMLElement>;
  @ViewChild('blobRef') blobRef!: ElementRef<HTMLDivElement>;
  @ViewChildren('tabBtn') tabBtns!: QueryList<ElementRef<HTMLButtonElement>>;

  readonly activeSection = signal<string>('home');
  readonly isVisible = signal(true);

  readonly navigation: TabItem[] = [
    { name: 'Home', link: '/', id: 'home', icon: 'home' },
    { name: 'About', link: '/#about', id: 'about', icon: 'user' },
    { name: 'Skills', link: '/#skills', id: 'skills', icon: 'wrench' },
    { name: 'Projects', link: '/#projects', id: 'projects', icon: 'folder' },
    { name: 'Contact', link: '/#contact', id: 'contact', icon: 'message-circle' },
    { name: 'Resume', link: '/resume', id: 'resume', icon: 'file-text' },
  ];

  private observer: IntersectionObserver | null = null;
  private routeSub?: Subscription;
  private resizeHandler: (() => void) | null = null;
  private blobReady = false;
  private lastAnimatedSection = '';

  private tabLayouts = new Map<string, { left: number; top: number; width: number; height: number; iconEl: HTMLElement | null }>();

  constructor() {
    effect(() => {
      const section = this.activeSection();
      const _visible = this.isVisible(); // Dependency tracking
      this.cdr.markForCheck();

      if (this.blobReady && section !== this.lastAnimatedSection) {
        this.lastAnimatedSection = section;
        // Allow Angular to expand the active tab text in the DOM before calculating
        requestAnimationFrame(() => {
          this.slideBlob();
        });
      }
    });
  }

  isActive(id: string): boolean {
    return this.activeSection() === id;
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.routeSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        if (e.urlAfterRedirects.includes('/resume')) {
          this.activeSection.set('resume');
        } else if (e.urlAfterRedirects === '/' || e.urlAfterRedirects.startsWith('/#')) {
          this.setupSectionObserver();
        }
      });

    const url = this.router.url;
    if (url.includes('/resume')) {
      this.activeSection.set('resume');
    } else {
      this.setupSectionObserver();
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.ngZone.runOutsideAngular(() => {
      this.scrollManager.register(this.onScroll);
      this.resizeHandler = () => {
        if (this.blobReady) this.placeBlobInstant();
      };
      window.addEventListener('resize', this.resizeHandler, { passive: true });
    });

    requestAnimationFrame(() => {
      this.calculateTabLayouts();
      this.placeBlobInstant();
      this.blobReady = true;
      this.lastAnimatedSection = this.activeSection();
    });
  }

  // DATA STRUCTURE: O(n) calculation cached into O(1) Hash Map
  private calculateTabLayouts(): void {
    if (!this.tabBtns) return;
    
    // Reset cache
    this.tabLayouts.clear();
    
    const tabs = this.tabBtns.toArray();
    tabs.forEach((btn) => {
      const el = btn.nativeElement;
      const id = el.getAttribute('data-tab-id');
      if (id) {
        // offsetLeft is heavily optimized by browser compared to getBoundingClientRect
        this.tabLayouts.set(id, {
          left: el.offsetLeft,
          top: el.offsetTop,
          width: el.offsetWidth,
          height: el.offsetHeight,
          iconEl: el.querySelector('.tab-icon-wrap') as HTMLElement,
        });
      }
    });
  }

  private placeBlobInstant(): void {
    this.calculateTabLayouts(); // Recalculate on resize
    const layout = this.tabLayouts.get(this.activeSection());
    if (!layout) return;
    
    const b = this.blobRef.nativeElement;
    Object.assign(b.style, {
      transform: `translate(${layout.left}px, ${layout.top}px)`,
      width: `${layout.width}px`,
      height: `${layout.height}px`,
      opacity: '1',
    });
  }

  private slideBlob(): void {
    // RECALCULATE Hash Map: The active tab expands its text label, which shifts 
    // the offsetLeft of all adjacent tabs! We must update the cache.
    this.calculateTabLayouts();

    const layout = this.tabLayouts.get(this.activeSection());
    if (!layout) return;

    const b = this.blobRef.nativeElement;

    // Use GPU-accelerated translate instead of animating 'left' property
    animate(b, {
      translateX: `${layout.left}px`,
      translateY: `${layout.top}px`,
      width: `${layout.width}px`,
      height: `${layout.height}px`,
      opacity: 1,
      duration: 400,
      ease: 'outExpo',
    });

    if (layout.iconEl) {
      animate(layout.iconEl, {
        scale: [1, 1.25, 1],
        duration: 380,
        ease: 'outExpo',
      });
    }
  }

  onTabClick(item: TabItem): void {
    this.activeSection.set(item.id);

    if (item.id === 'home') {
      const currentPath = this.router.url.split('#')[0];
      if (currentPath === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        this.router.navigate(['/']);
      }
      return;
    }

    if (item.link.startsWith('/#')) {
      const targetId = item.link.replace('/#', '');
      const currentPath = this.router.url.split('#')[0];

      if (currentPath === '/') {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        void this.router.navigate([], { fragment: targetId, replaceUrl: true });
      } else {
        void this.router.navigate(['/'], { fragment: targetId });
      }
      return;
    }

    void this.router.navigate([item.link]);
  }

  private setupSectionObserver(): void {
    this.observer?.disconnect();

    this.observer = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!best || entry.intersectionRatio > best.intersectionRatio) {
              best = entry;
            }
          }
        }
        if (best) {
          this.ngZone.run(() => this.activeSection.set(best!.target.id));
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: [0, 0.25],
      }
    );

    requestAnimationFrame(() => {
      NAV_SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) this.observer!.observe(el);
      });
    });
  }

  private onScroll = (data: ScrollData): void => {
    if (data.isMobile) {
      if (data.scrollY < 100) {
        if (!this.isVisible()) this.ngZone.run(() => this.isVisible.set(true));
      } else if (data.deltaY > 12) {
        if (this.isVisible()) this.ngZone.run(() => this.isVisible.set(false));
      } else if (data.deltaY < -3) {
        if (!this.isVisible()) this.ngZone.run(() => this.isVisible.set(true));
      }
    }
  };

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.scrollManager.unregister(this.onScroll);
    if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler);
    this.observer?.disconnect();
    this.routeSub?.unsubscribe();
  }
}
