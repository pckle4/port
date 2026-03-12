import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type Theme = 'dark' | 'light' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly storageKey = 'angular-ui-theme';
  private platformId = inject(PLATFORM_ID);

  theme = signal<Theme>('system');
  isDark = signal<boolean>(false);

  initTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const legacyTheme = localStorage.getItem('vite-ui-theme') as Theme | null;
      const storedTheme = (localStorage.getItem(this.storageKey) as Theme | null) ?? legacyTheme;

      if (legacyTheme && !localStorage.getItem(this.storageKey)) {
        localStorage.setItem(this.storageKey, legacyTheme);
      }

      if (storedTheme) {
        this.applyTheme(storedTheme);
      } else {
        this.applyTheme('system');
      }
    }
  }

  setTheme(newTheme: Theme) {
    this.theme.set(newTheme);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, newTheme);
      this.applyTheme(newTheme);
    }
  }

  toggleTheme() {
    const currentTheme = this.theme();
    if (currentTheme === 'light') {
      this.setTheme('dark');
    } else if (currentTheme === 'dark') {
      this.setTheme('system');
    } else {
      this.setTheme('light');
    }
  }

  private applyTheme(theme: Theme) {
    if (!isPlatformBrowser(this.platformId)) return;

    const root = window.document.documentElement;
    const resolved = theme === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;

    root.style.setProperty('transition', 'background-color 0.3s ease, color 0.3s ease');
    root.classList.remove('light', 'dark');
    root.classList.add(resolved);
    this.isDark.set(resolved === 'dark');
    root.style.colorScheme = resolved;

    setTimeout(() => root.style.removeProperty('transition'), 350);
  }
}
