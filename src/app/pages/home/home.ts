import { Component, OnDestroy, OnInit, PLATFORM_ID, inject, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeroSectionComponent } from '../../components/hero-section/hero-section';
import { AboutSectionComponent } from '../../components/about-section/about-section';
import { SkillsSectionComponent } from '../../components/skills-section/skills-section';
import { ProjectsSectionComponent } from '../../components/projects-section/projects-section';
import { ContactSectionComponent } from '../../components/contact-section/contact-section';
import { EnhancedFooterComponent } from '../../components/enhanced-footer/enhanced-footer';
import { SectionSkeletonComponent } from '../../components/ui/section-skeleton/section-skeleton';
import { SpinnerComponent } from '../../components/ui/spinner/spinner';
import { SectionRegistryService } from '../../services/section-registry.service';

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
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);
  public sectionRegistry = inject(SectionRegistryService);
  private removeScrollListener?: () => void;
  private rafId: number | null = null;
  private lastProgress = -1;

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const onScroll = () => {
      if (this.rafId !== null) return;
      this.rafId = requestAnimationFrame(() => {
        this.rafId = null;
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? scrollTop / docHeight : 0;
        if (Math.abs(progress - this.lastProgress) > 0.005 || this.lastProgress < 0) {
          this.lastProgress = progress;
          this.scrollProgress = progress;
          this.ngZone.run(() => this.cdr.markForCheck());
        }
      });
    };

    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', onScroll, { passive: true });
      this.removeScrollListener = () => window.removeEventListener('scroll', onScroll);
    });
  }

  ngOnDestroy() {
    this.removeScrollListener?.();
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
  }
}
