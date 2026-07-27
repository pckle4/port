import { Directive, ElementRef, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appStackSection]',
  standalone: true
})
export class StackSectionDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private resizeObserver?: ResizeObserver;
  private boundUpdate = this.updateStickyOffset.bind(this);

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = this.el.nativeElement as HTMLElement;
    element.style.position = 'sticky';

    // Smooth border-radius + shadow for premium stacking feel
    element.style.borderRadius = '0';
    element.style.transition = 'border-radius 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    element.style.willChange = 'transform';

    this.resizeObserver = new ResizeObserver(() => {
      this.updateStickyOffset();
    });

    this.resizeObserver.observe(element);
    window.addEventListener('resize', this.boundUpdate);

    // Initial calculation after view init
    setTimeout(() => {
      this.updateStickyOffset();
    }, 150);
  }

  private updateStickyOffset() {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = this.el.nativeElement as HTMLElement;
    const elementHeight = element.offsetHeight;
    const windowHeight = window.innerHeight;

    // If the section is taller than the screen, set a negative top
    // so it scrolls naturally until the bottom of the section
    // aligns with the bottom of the viewport, then it sticks.
    if (elementHeight > windowHeight) {
      const topOffset = windowHeight - elementHeight;
      element.style.top = `${topOffset}px`;
    } else {
      // Section fits entirely on screen — pin to top
      element.style.top = '0px';
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.boundUpdate);
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }
    }
  }
}

