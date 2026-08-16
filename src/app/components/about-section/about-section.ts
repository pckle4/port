import { Component, AfterViewInit, OnDestroy, PLATFORM_ID, inject, ChangeDetectionStrategy, ElementRef, NgZone } from '@angular/core';
import { SectionRegistryService } from '../../services/section-registry.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-section.html',
  styleUrls: ['./about-section.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutSectionComponent implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private sectionRegistry = inject(SectionRegistryService);

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.sectionRegistry.register('about');

      // Parallax effect for illustration
      this.ngZone.runOutsideAngular(() => {
        this.initParallax();
      });
    }
  }

  private initParallax() {
    const container = this.el.nativeElement.querySelector('.scan-container');
    const img = this.el.nativeElement.querySelector('.parallax-img');

    if (container && img) {
      container.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        (img as HTMLElement).style.transform = `translate(${x / 40}px, ${y / 40}px) scale(1.05)`;
      });

      container.addEventListener('mouseleave', () => {
        (img as HTMLElement).style.transform = 'translate(0, 0) scale(1)';
      });
    }
  }

  ngOnDestroy() {
    this.sectionRegistry.unregister('about');
  }
}
