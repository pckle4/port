import { Component, OnInit, signal, inject, OnDestroy, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { SectionRegistryService } from './services/section-registry.service';
import { smoothScrollToWithRetry } from './lib/utils';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import Lenis from 'lenis';

import { SiteHeaderComponent } from './shared/components/site-header/site-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SiteHeaderComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('my-app');

  private themeService = inject(ThemeService);
  private sectionRegistry = inject(SectionRegistryService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private routerSub?: Subscription;
  private lenis?: Lenis;

  isNotFoundPage = signal(false);

  ngOnInit() {
    this.themeService.initTheme();

    if (isPlatformBrowser(this.platformId)) {
      this.lenis = new Lenis({
        autoRaf: true,
      });
      (window as any).lenis = this.lenis;

      let previousUrl = '';
      this.routerSub = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: any) => {
        const currentUrl = event.urlAfterRedirects.split('#')[0];
        const isRouteChange = previousUrl !== '' && previousUrl !== currentUrl;
        previousUrl = currentUrl;

        // Hide header on 404 page
        this.isNotFoundPage.set(event.urlAfterRedirects.includes('/404'));
        
        const fragment = this.router.routerState.snapshot.root.fragment;
        if (fragment) {
          if (isRouteChange) {
            // Delay scroll to allow heavy DOM rendering/painting to finish
            setTimeout(() => this.scrollToFragment(fragment), 600);
          } else {
            this.scrollToFragment(fragment);
          }
        }
      });

      // Initial load with hash (e.g. external deep links) can happen before sections mount.
      const initialFragment = this.router.routerState.snapshot.root.fragment;
      if (initialFragment) {
        setTimeout(() => this.scrollToFragment(initialFragment), 0);
      }
    }
  }

  private scrollToFragment(fragment: string) {
    this.sectionRegistry.loadAllSections();
    smoothScrollToWithRetry(fragment, { maxRetries: 30, retryInterval: 100, duration: 1500 });
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
    this.lenis?.destroy();
  }
}
