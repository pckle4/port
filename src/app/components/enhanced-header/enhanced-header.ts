import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
  ChangeDetectionStrategy,
  signal,
  HostListener,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { SpotlightSearchComponent } from '../spotlight-search/spotlight-search';
import { LucideAngularModule } from 'lucide-angular';
import { ThemeService } from '../../services/theme.service';
import { smoothScrollToWithRetry } from '../../lib/utils';
import { StackRevealDirective } from '../../core/directives/stack-reveal.directive';
@Component({
  selector: 'app-enhanced-header',
  standalone: true,
  imports: [
    CommonModule,
    SpotlightSearchComponent,
    LucideAngularModule,
    StackRevealDirective
  ],
  templateUrl: './enhanced-header.html',
  styleUrls: ['./enhanced-header.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnhancedHeaderComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  readonly themeService = inject(ThemeService);

  readonly isSearchOpen = signal(false);
  readonly isDark = this.themeService.isDark;
  readonly isScrolled = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled.set(window.scrollY > 50);
    }
  }

  private keyHandler = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      e.stopPropagation();
      this.openSearch();
    }
  };

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    document.addEventListener('keydown', this.keyHandler);
  }

  openSearch(): void {
    this.isSearchOpen.set(true);
  }

  closeSearch(): void {
    this.isSearchOpen.set(false);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  scrollTo(id: string): void {
    smoothScrollToWithRetry(id);
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('keydown', this.keyHandler);
    }
  }
}
