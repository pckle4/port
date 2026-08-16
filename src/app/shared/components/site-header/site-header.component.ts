import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { smoothScrollToElement } from '../../../lib/utils';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeaderComponent {
  protected menuOpen = signal(false);
  private router = inject(Router);

  protected navigateTo(fragment: string, event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.menuOpen.set(false);
    if (this.router.url === '/' || this.router.url.startsWith('/#')) {
      const element = document.getElementById(fragment);
      if (element) {
        const lenis = (window as any).lenis;
        if (lenis && typeof lenis.scrollTo === 'function') {
          lenis.scrollTo(element, { offset: -50, duration: 1.5 });
        } else {
          smoothScrollToElement(element, { offset: 50, duration: 1500 });
        }
      }
    } else {
      this.router.navigate(['/'], { fragment });
    }
  }
}
