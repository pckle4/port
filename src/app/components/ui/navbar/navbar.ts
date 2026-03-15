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
    const condensed = this.state.isCondensed();
    const visible = this.state.isVisible();

    return cn(
      'fixed top-4 left-0 right-0 z-50 mx-auto transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
      'will-change-[transform,opacity]',
      condensed ? 'w-[92%] md:w-fit' : 'w-[92%] md:w-[85%] max-w-4xl',
      visible
        ? 'translate-y-0 opacity-100'
        : '-translate-y-[calc(100%+1rem)] opacity-0 pointer-events-none'
    );
  });

  readonly innerClass = computed(() => {
    const condensed = this.state.isCondensed();

    return cn(
      'inner rounded-full border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] px-6 sm:px-8',
      condensed
        ? 'bg-white/90 dark:bg-slate-950/75 backdrop-blur-xl shadow-xl shadow-black/5 dark:shadow-cyan-500/10 border-cyan-500/20 dark:border-cyan-400/20 py-2'
        : 'bg-white/65 dark:bg-slate-950/45 backdrop-blur-md border-white/40 dark:border-white/10 shadow-sm py-2.5'
    );
  });
}
