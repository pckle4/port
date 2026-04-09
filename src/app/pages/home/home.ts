import { Component, OnDestroy, OnInit, PLATFORM_ID, inject, ChangeDetectionStrategy, signal, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeroSectionComponent } from '../../components/hero-section/hero-section';
import { AboutSectionComponent } from '../../components/about-section/about-section';
import { SkillsSectionComponent } from '../../components/skills-section/skills-section';
import { ProjectsSectionComponent } from '../../components/projects-section/projects-section';
import { ContactSectionComponent } from '../../components/contact-section/contact-section';
import { EnhancedFooterComponent } from '../../components/enhanced-footer/enhanced-footer';
import { SectionSkeletonComponent } from '../../components/ui/section-skeleton/section-skeleton';
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
    SectionSkeletonComponent,
    GridBackgroundComponent
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoading = signal(true);

  private platformId = inject(PLATFORM_ID);
  public sectionRegistry = inject(SectionRegistryService);
  private loadingTimeout?: ReturnType<typeof setTimeout>;

  private readonly _forceLoadEffect = effect(() => {
    if (this.sectionRegistry.forceLoadAllSections()) {
      this.finishLoading();
    }
  });

  private finishLoading(): void {
    if (!this.isLoading()) return;
    if (this.loadingTimeout) {
      clearTimeout(this.loadingTimeout);
      this.loadingTimeout = undefined;
    }
    this.isLoading.set(false);
  }

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (window.location.hash.length > 1) {
      this.sectionRegistry.loadAllSections();
    }

    if (this.sectionRegistry.forceLoadAllSections()) {
      this.finishLoading();
    } else {
      this.loadingTimeout = setTimeout(() => this.finishLoading(), 1500);
    }
  }

  ngOnDestroy() {
    if (this.loadingTimeout) clearTimeout(this.loadingTimeout);
  }
}
