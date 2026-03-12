import { Component, OnInit, OnDestroy, inject, PLATFORM_ID, ChangeDetectionStrategy, ChangeDetectorRef, NgZone, signal } from '@angular/core';
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
import { NavbarStateService } from '../ui/navbar/navbar';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle';
import { SpotlightSearchComponent } from '../spotlight-search/spotlight-search';
import { cn } from '../../lib/utils';
import { smoothScrollToElement } from '../../lib/utils';

interface NavItem {
  name: string;
  link: string;
  id: string;
  icon: string;
}

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnhancedHeaderComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);
  navbarState = inject(NavbarStateService);

  activeItem = signal('home');
  isSearchOpen = signal(false);
  isMobileMenuOpen = signal(false);

  navigation: NavItem[] = [
    { name: 'Home', link: '/', id: 'home', icon: 'home' },
    { name: 'About', link: '/#about', id: 'about', icon: 'user' },
    { name: 'Skills', link: '/#skills', id: 'skills', icon: 'wrench' },
    { name: 'Projects', link: '/#projects', id: 'projects', icon: 'folder' },
    { name: 'Contact', link: '/#contact', id: 'contact', icon: 'message-circle' },
    { name: 'Resume', link: '/resume', id: 'resume', icon: 'file-text' },
  ];

  private observer?: IntersectionObserver;
  private keyHandler = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      e.stopPropagation();
      this.openSearch();
    }
  };
  private routeSub?: Subscription;
  private scrollListener?: () => void;
  private lastScrolledState = false;

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    document.addEventListener('keydown', this.keyHandler);

    const onScroll = () => {
      if (this.lastScrolledState !== this.navbarState.isScrolled) {
        this.lastScrolledState = this.navbarState.isScrolled;
        this.cdr.markForCheck();
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    this.scrollListener = () => window.removeEventListener('scroll', onScroll);

    this.routeSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        if (e.urlAfterRedirects === '/resume') {
          this.activeItem.set('resume');
        } else if (e.urlAfterRedirects === '/' || e.urlAfterRedirects.startsWith('/#')) {
          this.setupIntersectionObserver();
        }
      });

    const url = this.router.url;
    if (url === '/resume') {
      this.activeItem.set('resume');
    } else {
      this.setupIntersectionObserver();
    }
  }

  private setupIntersectionObserver() {
    this.observer?.disconnect();

    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeItem.set(entry.target.id);
            this.cdr.markForCheck();
          }
        });
      },
      { root: null, rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    setTimeout(() => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) this.observer!.observe(el);
      });
    }, 100);
  }

  handleNavClick(link: string, id: string) {
    this.activeItem.set(id);
    this.isMobileMenuOpen.set(false);
    this.cdr.markForCheck();

    if (link.startsWith('/#')) {
      const targetId = link.replace('/#', '');
      const currentUrl = this.router.url.split('#')[0];

      if (currentUrl === '/') {
        const el = document.getElementById(targetId);
        if (el) smoothScrollToElement(el);
      } else {
        this.router.navigate(['/'], { fragment: targetId });
      }
    } else {
      this.router.navigate([link]);
    }
  }

  getNavItemClass(id: string): string {
    const isAlwaysVisible = id === 'home' || id === 'resume';
    const isHidden = this.navbarState.isScrolled && !isAlwaysVisible;

    return cn(
      'relative text-sm font-medium transition-all duration-500 ease-in-out rounded-full overflow-hidden whitespace-nowrap will-change-[width,opacity]',
      isHidden ? 'w-0 opacity-0 px-0 m-0 pointer-events-none' : 'w-auto opacity-100 px-3 py-1.5',
      !isHidden && this.activeItem() === id ? 'text-foreground font-semibold' : 'text-muted-foreground hover:bg-muted/50'
    );
  }

  isNavItemHidden(id: string): boolean {
    const isAlwaysVisible = id === 'home' || id === 'resume';
    return this.navbarState.isScrolled && !isAlwaysVisible;
  }

  getNavItemActiveClass(id: string): string {
    if (this.activeItem() !== id || this.isNavItemHidden(id)) return '';
    return 'absolute inset-0 bg-secondary rounded-full -z-10 animate-fade-in shadow-sm';
  }

  getMobileItemClass(id: string): string {
    return cn(
      'flex items-center gap-3 w-full text-left py-3 px-2 rounded-lg transition-all',
      this.activeItem() === id ? 'bg-muted font-semibold' : 'hover:bg-muted'
    );
  }

  openSearch() {
    this.isSearchOpen.set(true);
    this.cdr.markForCheck();
  }

  closeSearch() {
    this.isSearchOpen.set(false);
    this.cdr.markForCheck();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
    this.cdr.markForCheck();
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
    this.cdr.markForCheck();
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('keydown', this.keyHandler);
    }
    this.scrollListener?.();
    this.observer?.disconnect();
    this.routeSub?.unsubscribe();
  }
}
