import { Component, inject, HostListener, ElementRef, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ThemeService } from '../../services/theme.service';
import { cn } from '../../lib/utils';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './theme-toggle.html',
  styleUrls: ['./theme-toggle.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);
  private elRef = inject(ElementRef);

  isOpen = signal(false);

  themes = [
    { name: 'light' as const, icon: 'sun', label: 'Light' },
    { name: 'dark' as const, icon: 'moon', label: 'Dark' },
    { name: 'system' as const, icon: 'monitor', label: 'System' },
  ];

  activeTheme = computed(() => this.themeService.theme());

  activeIcon = computed(() => {
    const t = this.themes.find(t => t.name === this.activeTheme());
    return t ? t.icon : 'monitor';
  });

  toggle() {
    this.isOpen.update(v => !v);
  }

  selectTheme(name: 'light' | 'dark' | 'system') {
    this.themeService.setTheme(name);
    this.isOpen.set(false);
    window.dispatchEvent(new CustomEvent('theme-changed'));
  }

  getButtonClass(name: string): string {
    return cn(
      'flex items-center gap-2.5 px-3 py-2 w-full text-sm font-medium rounded-xl transition-colors duration-200 cursor-pointer outline-none border-none',
      this.activeTheme() === name
        ? 'bg-black/5 dark:bg-white/10 text-indigo-600 dark:text-indigo-400'
        : 'text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5'
    );
  }

  @HostListener('document:mousedown', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.isOpen() && !this.elRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }
}
