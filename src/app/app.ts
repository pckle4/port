import { Component, OnInit, signal, inject, OnDestroy, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { SectionRegistryService } from './services/section-registry.service';
import { smoothScrollToWithRetry } from './lib/utils';
import { EnhancedHeaderComponent } from './components/enhanced-header/enhanced-header';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    EnhancedHeaderComponent
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

  ngOnInit() {
    this.themeService.initTheme();

    if (isPlatformBrowser(this.platformId)) {
      this.routerSub = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        const fragment = this.router.routerState.snapshot.root.fragment;
        if (fragment) {
          this.scrollToFragment(fragment);
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
    smoothScrollToWithRetry(fragment, { maxRetries: 30, retryInterval: 100 });
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }
}
