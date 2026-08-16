import { Component, PLATFORM_ID, inject, ChangeDetectionStrategy, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SectionRegistryService } from '../../services/section-registry.service';
import { PORTFOLIO_PROJECTS } from '../../core/models/portfolio-projects.models';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects-section.html',
  styleUrls: ['./projects-section.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsSectionComponent implements OnInit, OnDestroy {
  protected readonly projects = PORTFOLIO_PROJECTS;
  private platformId = inject(PLATFORM_ID);
  private sectionRegistry = inject(SectionRegistryService);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.sectionRegistry.register('projects');
    }
  }

  ngOnDestroy() {
    this.sectionRegistry.unregister('projects');
  }
}
