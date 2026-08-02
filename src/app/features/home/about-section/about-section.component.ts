import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PORTFOLIO_ABOUT_PROFILE } from '../../../core/models/portfolio-about.models';

@Component({
  selector: 'app-about-section',
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutSectionComponent {
  protected readonly profile = PORTFOLIO_ABOUT_PROFILE;
}
