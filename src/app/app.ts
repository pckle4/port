import { Component, OnInit, signal, inject, OnDestroy, PLATFORM_ID, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { EnhancedHeaderComponent } from './components/enhanced-header/enhanced-header';
import { EnhancedFooterComponent } from './components/enhanced-footer/enhanced-footer';
import { GridBackgroundComponent } from './components/ui/grid-background/grid-background';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import Lenis from 'lenis';
import gsap from 'gsap';

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
  private ngZone = inject(NgZone);
  private boundRaf?: (time: number) => void;

  isNotFoundPage = signal(false);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Delay theme init to prevent hydration mismatch with server's light mode default
      setTimeout(() => {
        this.themeService.initTheme();
      }, 0);

      this.ngZone.runOutsideAngular(() => {
        // Initialize Lenis Smooth Scroll with butter-smooth spring dynamics
        this.lenis = new Lenis({ 
          duration: 1.1, 
          easing: (t) => 1 - Math.pow(1 - t, 3) 
        });
        
        // Sync Lenis perfectly with GSAP ticker to prevent lag and frame fighting
        gsap.ticker.lagSmoothing(0);
        
        this.boundRaf = (time: number) => { 
          this.lenis?.raf(time * 1000); // GSAP provides time in seconds, Lenis needs ms
        };
        
        gsap.ticker.add(this.boundRaf);
      });

      this.routerSub = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: any) => {
        this.isNotFoundPage.set(event.urlAfterRedirects.includes('/404'));
      });
    }
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
    if (this.boundRaf) {
      gsap.ticker.remove(this.boundRaf);
    }
    this.lenis?.destroy();
  }
}
