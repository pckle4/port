import { Component, OnDestroy, OnInit, PLATFORM_ID, inject, ChangeDetectionStrategy, signal, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeroSectionComponent } from '../../components/hero-section/hero-section';
import { AboutSectionComponent } from '../../components/about-section/about-section';
import { SkillsSectionComponent } from '../../components/skills-section/skills-section';
import { ProjectsSectionComponent } from '../../components/projects-section/projects-section';
import { ContactSectionComponent } from '../../components/contact-section/contact-section';
import { EnhancedFooterComponent } from '../../components/enhanced-footer/enhanced-footer';
import { SectionRegistryService } from '../../services/section-registry.service';
import { GridBackgroundComponent } from '../../components/ui/grid-background/grid-background';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    AboutSectionComponent,
    SkillsSectionComponent,
    ProjectsSectionComponent,
    ContactSectionComponent,
    EnhancedFooterComponent,
    GridBackgroundComponent
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
