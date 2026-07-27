import { Component, OnInit, signal, inject, OnDestroy, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { EnhancedHeaderComponent } from './components/enhanced-header/enhanced-header';
import { EnhancedFooterComponent } from './components/enhanced-footer/enhanced-footer';
import { GridBackgroundComponent } from './components/ui/grid-background/grid-background';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import Lenis from 'lenis';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    EnhancedHeaderComponent,
    EnhancedFooterComponent,
    GridBackgroundComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('my-app');

  private themeService = inject(ThemeService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private routerSub?: Subscription;
  private lenis?: Lenis;
  private rafId?: number;

  isNotFoundPage = signal(false);

  ngOnInit() {
    this.themeService.initTheme();

    if (isPlatformBrowser(this.platformId)) {
      // Initialize Lenis Smooth Scroll with butter-smooth spring dynamics
      this.lenis = new Lenis({ 
        duration: 1.1, 
        easing: (t) => 1 - Math.pow(1 - t, 3) 
      });
      
      const raf = (time: number) => { 
        this.lenis?.raf(time); 
        this.rafId = requestAnimationFrame(raf); 
      };
      this.rafId = requestAnimationFrame(raf);

      this.routerSub = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: any) => {
        this.isNotFoundPage.set(event.urlAfterRedirects.includes('/404'));
      });
    }
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.lenis?.destroy();
  }
}
