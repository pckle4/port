import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-portfolio-hero',
  templateUrl: './portfolio-hero.component.html',
  styleUrl: './portfolio-hero.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioHeroComponent {
  protected scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
