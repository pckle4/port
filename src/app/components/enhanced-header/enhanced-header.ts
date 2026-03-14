import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
  ChangeDetectionStrategy,
  signal,
  effect,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { NavbarComponent } from '../ui/navbar/navbar';
import { NavBodyComponent } from '../ui/nav-body/nav-body';
import { NavbarLogoComponent } from '../ui/navbar-logo/navbar-logo';
import { MobileNavComponent } from '../ui/mobile-nav/mobile-nav';
import { MobileNavHeaderComponent } from '../ui/mobile-nav-header/mobile-nav-header';
import { MobileNavToggleComponent } from '../ui/mobile-nav-toggle/mobile-nav-toggle';
import { MobileNavMenuComponent } from '../ui/mobile-nav-menu/mobile-nav-menu';
import { NavbarStateService } from '../../services/navbar-state.service';
import { SectionRegistryService } from '../../services/section-registry.service';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle';
import { SpotlightSearchComponent } from '../spotlight-search/spotlight-search';
import { cn } from '../../lib/utils';
import { smoothScrollToWithRetry } from '../../lib/utils';

export interface NavItem {
  name: string;
  link: string;
  id: string;
  icon: string;
}

const NAV_SECTIONS = ['home', 'about', 'skills', 'projects', 'contact'] as const;

@Component({
  selector: 'app-enhanced-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule,
    NavbarComponent,
    NavBodyComponent,
    NavbarLogoComponent,
    MobileNavComponent,
    MobileNavHeaderComponent,
    MobileNavToggleComponent,
    MobileNavMenuComponent,
    ThemeToggleComponent,
    SpotlightSearchComponent,
  ],
  templateUrl: './enhanced-header.html',
  styleUrls: ['./enhanced-header.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnhancedHeaderComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly sectionRegistry = inject(SectionRegistryService);
  readonly state = inject(NavbarStateService);

  readonly activeSection = signal<string>('home');
  readonly isSearchOpen = signal(false);
  readonly isMobileMenuOpen = signal(false);

  readonly navigation: NavItem[] = [
    { name: 'Home', link: '/', id: 'home', icon: 'home' },
    { name: 'About', link: '/#about', id: 'about', icon: 'user' },
    { name: 'Skills', link: '/#skills', id: 'skills', icon: 'wrench' },
    { name: 'Projects', link: '/#projects', id: 'projects', icon: 'folder' },
    { name: 'Contact', link: '/#contact', id: 'contact', icon: 'message-circle' },
    { name: 'Resume', link: '/resume', id: 'resume', icon: 'file-text' },
  ];

  /** Nav items that stay visible when condensed (logo + resume) */
  private readonly alwaysVisibleIds = new Set(['home', 'resume']);

  isNavItemHidden(id: string): boolean {
    return this.state.isCondensed() && !this.alwaysVisibleIds.has(id);
  }

  getNavItemClass(id: string): string {
    const hidden = this.state.isCondensed() && !this.alwaysVisibleIds.has(id);
    const active = this.activeSection() === id;

    return cn(
      'relative text-sm font-medium transition-all duration-300 ease-out rounded-full overflow-hidden whitespace-nowrap',
      hidden
        ? 'w-0 opacity-0 px-0 m-0 pointer-events-none overflow-hidden'
        : 'w-auto opacity-100 px-3 py-1.5',
      !hidden && active
        ? 'text-foreground font-semibold'
        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
    );
  }

  getNavItemActiveClass(id: string): string {
    const hidden = this.state.isCondensed() && !this.alwaysVisibleIds.has(id);
    if (this.activeSection() !== id || hidden) return '';
    return 'absolute inset-0 bg-secondary rounded-full -z-10 shadow-sm animate-nav-pill-in';
  }

  getMobileItemClass(id: string): string {
    const active = this.activeSection() === id;
    return cn(
      'flex items-center gap-3 w-full text-left py-3.5 px-4 rounded-xl transition-all duration-200',
      active
        ? 'bg-secondary/80 font-semibold text-foreground'
        : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
    );
  }

  private observer: IntersectionObserver | null = null;
  private routeSub?: Subscription;
  private sectionSub?: () => void;
  private retryTimeouts: ReturnType<typeof setTimeout>[] = [];
  private keyHandler = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      e.stopPropagation();
      this.openSearch();
    }
  };

  constructor() {
    effect(() => {
      this.state.isCondensed();
      this.state.isVisible();
      this.activeSection();
      this.cdr.markForCheck();
    });
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    document.addEventListener('keydown', this.keyHandler);

    this.routeSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        if (e.urlAfterRedirects === '/resume') {
          this.activeSection.set('resume');
        } else if (e.urlAfterRedirects === '/' || e.urlAfterRedirects.startsWith('/#')) {
          this.scheduleObserverSetup();
        }
      });

    this.sectionSub = this.sectionRegistry.onSectionsReady(() => this.setupSectionObserver());

    const url = this.router.url;
    if (url === '/resume') {
      this.activeSection.set('resume');
    } else {
      this.scheduleObserverSetup();
    }
  }

  /** Schedule observer setup immediately and with retries to catch lazy/deferred content */
  private scheduleObserverSetup(): void {
    this.clearRetryTimeouts();
    this.setupSectionObserver();
    [150, 400, 800, 1200].forEach((ms) => {
      this.retryTimeouts.push(
        setTimeout(() => this.setupSectionObserver(), ms)
      );
    });
  }

  private clearRetryTimeouts(): void {
    this.retryTimeouts.forEach((t) => clearTimeout(t));
    this.retryTimeouts = [];
  }

  private setupSectionObserver(): void {
    this.observer?.disconnect();

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
            break;
          }
        }
      },
      {
        root: null,
        rootMargin: '-15% 0px -75% 0px',
        threshold: 0,
      }
    );

    requestAnimationFrame(() => {
      NAV_SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) this.observer!.observe(el);
      });
    });
  }

  handleNavClick(link: string, id: string): void {
    this.activeSection.set(id);
    this.isMobileMenuOpen.set(false);

    if (link.startsWith('/#')) {
      const targetId = link.replace('/#', '');
      const currentUrl = this.router.url.split('#')[0];

      if (currentUrl === '/') {
        this.sectionRegistry.loadAllSections();
        smoothScrollToWithRetry(targetId, { maxRetries: 25, retryInterval: 100 });
      } else {
        this.sectionRegistry.loadAllSections();
        this.router.navigate(['/'], { fragment: targetId });
      }
    } else {
      this.router.navigate([link]);
    }
  }

  openSearch(): void {
    this.isSearchOpen.set(true);
  }

  closeSearch(): void {
    this.isSearchOpen.set(false);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('keydown', this.keyHandler);
    }
    this.clearRetryTimeouts();
    this.sectionSub?.();
    this.observer?.disconnect();
    this.routeSub?.unsubscribe();
  }
}
