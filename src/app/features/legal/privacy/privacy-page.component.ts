import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteHeaderComponent } from '../../../shared/components/site-header/site-header.component';
import { PortfolioFooterComponent } from '../../home/portfolio-footer/portfolio-footer.component';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-privacy-page',
  standalone: true,
  imports: [SiteHeaderComponent, PortfolioFooterComponent, RevealDirective],
  templateUrl: './privacy-page.component.html',
  styleUrl: '../legal-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPageComponent {
  protected readonly copied = signal(false);

  copyEmail() {
    navigator.clipboard.writeText('legal@nowhile.com').then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }

  scrollTo(id: string, event: Event): void {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
