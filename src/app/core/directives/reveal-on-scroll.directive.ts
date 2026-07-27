import { Directive, ElementRef, AfterViewInit, OnDestroy, PLATFORM_ID, inject, NgZone, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Directive({
  selector: '[revealOnScroll]',
  standalone: true
})
export class RevealOnScrollDirective implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private ctx: gsap.Context | null = null;
  
  @Input() revealDirection: 'up' | 'left' | 'right' | 'down' | 'fade' = 'up';
  @Input() revealDelay = 0;
  
  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.ngZone.runOutsideAngular(() => {
      this.ctx = gsap.context(() => {
        
        let startProps: gsap.TweenVars = { autoAlpha: 0 };
        switch(this.revealDirection) {
          case 'up': startProps = { ...startProps, y: 50 }; break;
          case 'down': startProps = { ...startProps, y: -50 }; break;
          case 'left': startProps = { ...startProps, x: -40 }; break;
          case 'right': startProps = { ...startProps, x: 40 }; break;
          case 'fade': break; // only autoAlpha
        }
        
        gsap.fromTo(this.el.nativeElement, 
          startProps,
          {
            y: 0,
            x: 0,
            autoAlpha: 1,
            duration: 1.1,
            delay: this.revealDelay,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: this.el.nativeElement,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }, this.el.nativeElement);
    });
  }

  ngOnDestroy() {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
