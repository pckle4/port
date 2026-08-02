import { AfterViewInit, Directive, ElementRef, HostBinding, OnDestroy, inject, input } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Directive({ selector: '[appReveal]', standalone: true })
export class RevealDirective implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private trigger?: ScrollTrigger;
  readonly appReveal = input<'up' | 'left' | 'right' | ''>('up');

  @HostBinding('class') get revealClasses(): string { return 'app-reveal'; }

  ngAfterViewInit(): void {
    const el = this.host.nativeElement;
    
    let startY = 0;
    let startX = 0;
    switch(this.appReveal()) {
      case 'left': startX = -60; break;
      case 'right': startX = 60; break;
      case 'up': 
      default: startY = 60; break;
    }

    gsap.fromTo(el, 
      { y: startY, x: startX, autoAlpha: 0 },
      {
        y: 0,
        x: 0,
        autoAlpha: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach(t => {
      if (t.trigger === this.host.nativeElement) t.kill();
    });
  }
}
