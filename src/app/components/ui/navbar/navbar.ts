import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../lib/utils';
import { NavbarStateService } from '../../../services/navbar-state.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  readonly state = inject(NavbarStateService);

  readonly headerClass = computed(() => {
    const visible = this.state.isVisible();

    return cn(
      'fixed top-4 left-0 right-0 z-50 w-full flex justify-center pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] [contain:layout_style]',
      'will-change-[transform,opacity]',
      visible
        ? 'translate-y-0 opacity-100'
        : '-translate-y-[calc(100%+1rem)] opacity-0'
    );
  });

  readonly innerClass = computed(() => {
    const condensed = this.state.isCondensed();

    return cn(
      'pointer-events-auto rounded-full border transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] px-5 sm:px-6 w-[92%] sm:w-fit backdrop-blur-[20px]',
      condensed
        ? 'bg-white/95 dark:bg-[#161618]/85 backdrop-blur-xl dark:backdrop-blur-[16px] shadow-xl shadow-black/5 dark:shadow-black/35 border-primary/20 dark:border-[#252528] py-1.5 sm:py-2'
        : 'bg-white/90 dark:bg-[#1C1C1F]/85 backdrop-blur-md dark:backdrop-blur-[16px] border-white/40 dark:border-[#2E2E33] shadow-md dark:shadow-black/40 py-2 sm:py-2.5'
    );
  });
}
