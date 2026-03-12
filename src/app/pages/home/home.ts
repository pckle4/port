import { Component, OnDestroy, OnInit, PLATFORM_ID, inject, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeroSectionComponent } from '../../components/hero-section/hero-section';
import { AboutSectionComponent } from '../../components/about-section/about-section';
import { SkillsSectionComponent } from '../../components/skills-section/skills-section';
import { ProjectsSectionComponent } from '../../components/projects-section/projects-section';
import { ContactSectionComponent } from '../../components/contact-section/contact-section';
import { EnhancedFooterComponent } from '../../components/enhanced-footer/enhanced-footer';
import { SectionSkeletonComponent } from '../../components/ui/section-skeleton/section-skeleton';
import { SpinnerComponent } from '../../components/ui/spinner/spinner';

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
    SpinnerComponent
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  scrollProgress = 0;

  private platformId = inject(PLATFORM_ID);
  private removeScrollListener?: () => void;

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      this.scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    this.removeScrollListener = () => window.removeEventListener('scroll', updateProgress);
  }

  ngOnDestroy() {
    this.removeScrollListener?.();
  }
}
