import { Component, OnInit, signal, inject, OnDestroy, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { MagicLoaderComponent } from './components/ui/magic-loader/magic-loader';
import { EnhancedHeaderComponent } from './components/enhanced-header/enhanced-header';
import { ToastProviderComponent } from './components/ui/toast-provider/toast-provider';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MagicLoaderComponent,
    EnhancedHeaderComponent,
    ToastProviderComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('my-app');

  isLoading = signal(true);

  private themeService = inject(ThemeService);
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
    }
  }

  private scrollToFragment(fragment: string, retries = 12) {
    const el = document.getElementById(fragment);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (retries > 0) {
      setTimeout(() => this.scrollToFragment(fragment, retries - 1), 120);
    }
  }

  onMagicLoaderComplete() {
    this.isLoading.set(false);
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }
}
