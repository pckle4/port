import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

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
        // Look for lenis on window (if exposed) or fallback to smooth scroll
        const lenis = (window as any).lenis;
        if (lenis && typeof lenis.scrollTo === 'function') {
          lenis.scrollTo(element, { offset: -50, duration: 1.2 });
        } else {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      this.router.navigate(['/'], { fragment });
    }
  }
}
