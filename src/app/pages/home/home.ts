import { Component, OnInit, PLATFORM_ID, inject, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeroSectionComponent } from '../../components/hero-section/hero-section';
import { AboutSectionComponent } from '../../components/about-section/about-section';
import { SkillsSectionComponent } from '../../components/skills-section/skills-section';
import { ProjectsSectionComponent } from '../../components/projects-section/projects-section';
import { WorkflowSectionComponent } from '../../components/workflow-section/workflow-section';
import { ContactSectionComponent } from '../../components/contact-section/contact-section';
import { EnhancedFooterComponent } from '../../components/enhanced-footer/enhanced-footer';
import { SectionRegistryService } from '../../services/section-registry.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    AboutSectionComponent,
    SkillsSectionComponent,
    ProjectsSectionComponent,
    WorkflowSectionComponent,
    ContactSectionComponent,
    EnhancedFooterComponent
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  public sectionRegistry = inject(SectionRegistryService);

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (window.location.hash.length > 1) {
      this.sectionRegistry.loadAllSections();
    }
  }
}
