import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { TabBarComponent } from '../tab-bar/tab-bar';
import { SpotlightSearchComponent } from '../spotlight-search/spotlight-search';
import { LucideAngularModule } from 'lucide-angular';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-enhanced-header',
  standalone: true,
  imports: [
    CommonModule,
    TabBarComponent,
    SpotlightSearchComponent,
    LucideAngularModule,
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

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('keydown', this.keyHandler);
    }
  }
}
