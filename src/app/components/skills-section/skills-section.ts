import { Component, OnInit, OnDestroy, ElementRef, PLATFORM_ID, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { SectionRegistryService } from '../../services/section-registry.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SkillCardComponent } from './skill-card/skill-card';
import { IconCloudComponent } from '../ui/icon-cloud/icon-cloud';
import { SiteDataService } from '../../services/site-data.service';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [CommonModule, SkillCardComponent, IconCloudComponent],
  templateUrl: './skills-section.html',
  styleUrls: ['./skills-section.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsSectionComponent implements OnInit, OnDestroy {
  isVisible = signal(true);

  private platformId = inject(PLATFORM_ID);
  private el = inject(ElementRef);
  private sectionRegistry = inject(SectionRegistryService);
  private siteDataService = inject(SiteDataService);

  skillCategories = this.siteDataService.data().skillCategories;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.sectionRegistry.register('skills');
    }
  }

  ngOnDestroy() {
    this.sectionRegistry.unregister('skills');
  }
}
