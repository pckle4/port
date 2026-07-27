import { Directive, ElementRef, HostListener, inject, NgZone, PLATFORM_ID, OnDestroy, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';

@Directive({
  selector: '[magneticButton]',
  standalone: true
})
export class MagneticButtonDirective implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private ctx: gsap.Context | null = null;
  
  private mouseMoveHandler?: (e: MouseEvent) => void;
  private mouseLeaveHandler?: () => void;

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.ngZone.runOutsideAngular(() => {
      this.ctx = gsap.context(() => {
        const btn = this.el.nativeElement as HTMLElement;
        
        this.mouseMoveHandler = (e: MouseEvent) => {
          const r = btn.getBoundingClientRect();
          const x = e.clientX - (r.left + r.width / 2);
          const y = e.clientY - (r.top + r.height / 2);
          
          gsap.to(btn, { 
            x: x * 0.3, 
            y: y * 0.3, 
            duration: 0.3, 
            ease: 'power2.out' 
          });
        };

        this.mouseLeaveHandler = () => {
          gsap.to(btn, { 
            x: 0, 
            y: 0, 
            duration: 0.7, 
            ease: 'elastic.out(1, 0.3)' 
          });
        };

        btn.addEventListener('mousemove', this.mouseMoveHandler);
        btn.addEventListener('mouseleave', this.mouseLeaveHandler);
      }, this.el.nativeElement);
    });
  }

  ngOnDestroy() {
    if (this.ctx) {
      const btn = this.el.nativeElement as HTMLElement;
      if (this.mouseMoveHandler) btn.removeEventListener('mousemove', this.mouseMoveHandler);
      if (this.mouseLeaveHandler) btn.removeEventListener('mouseleave', this.mouseLeaveHandler);
      this.ctx.revert();
    }
  }
}
