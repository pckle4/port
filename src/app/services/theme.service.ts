import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type Theme = 'dark' | 'light' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly storageKey = 'angular-ui-theme';
  private platformId = inject(PLATFORM_ID);
  private systemThemeMedia?: MediaQueryList;
  private systemThemeListener?: (e: MediaQueryListEvent) => void;
  private clearThemeSwitchTimer?: ReturnType<typeof setTimeout>;
  private currentResolvedTheme: 'dark' | 'light' = 'dark';

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
        this.theme.set(storedTheme);
        this.applyTheme(storedTheme, false);
      } else {
        this.theme.set('system');
        this.applyTheme('system', false);
      }

      this.setupSystemThemeListener();
    }
  }

  setTheme(newTheme: Theme) {
    const previousTheme = this.theme();
    this.theme.set(newTheme);

    if (isPlatformBrowser(this.platformId)) {
      if (previousTheme !== newTheme) {
        localStorage.setItem(this.storageKey, newTheme);
      }
      this.applyTheme(newTheme, true);
    }
  }

  toggleTheme() {
    const resolvedTheme = this.resolveTheme(this.theme());
    this.setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }

  private resolveTheme(theme: Theme): 'dark' | 'light' {
    return theme === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
  }

  private setupSystemThemeListener(): void {
    if (this.systemThemeMedia || !isPlatformBrowser(this.platformId)) return;

    this.systemThemeMedia = window.matchMedia('(prefers-color-scheme: dark)');
    this.systemThemeListener = () => {
      if (this.theme() === 'system') {
        this.applyTheme('system', true);
      }
    };
    this.systemThemeMedia.addEventListener('change', this.systemThemeListener);
  }

  private applyTheme(theme: Theme, emitEvent: boolean) {
    if (!isPlatformBrowser(this.platformId)) return;

    const root = window.document.documentElement;
    const resolved = this.resolveTheme(theme);
    const changed = this.currentResolvedTheme !== resolved;

    root.classList.toggle('dark', resolved === 'dark');
    root.classList.toggle('light', resolved === 'light');

    this.isDark.set(resolved === 'dark');
    this.currentResolvedTheme = resolved;
    root.style.colorScheme = resolved;

    if (emitEvent && changed) {
      window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme: resolved } }));
    }
  }
}
