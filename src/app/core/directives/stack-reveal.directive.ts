import { Directive, ElementRef, AfterViewInit, OnDestroy, PLATFORM_ID, inject, NgZone, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';

@Directive({
  selector: '[stackReveal]',
  standalone: true
})
export class StackRevealDirective implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private ctx: gsap.Context | null = null;
  
  @Input() stackDelay = 0.2;
  @Input() stackStagger = 0.12;
  
  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.ngZone.runOutsideAngular(() => {
      this.ctx = gsap.context(() => {
        // The directive finds all .stack-line elements within itself
        const lines = this.el.nativeElement.querySelectorAll('.stack-line');
        
        if (lines.length > 0) {
          gsap.to(lines, { 
            y: 0, 
            duration: 1, 
            ease: 'expo.out', 
            stagger: this.stackStagger, 
            delay: this.stackDelay 
          });
        }
      }, this.el.nativeElement);
    });
  }

  ngOnDestroy() {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
