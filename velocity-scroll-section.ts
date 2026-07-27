import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  QueryList,
  ViewChild,
  ViewChildren,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface MarqueeRow {
  words: string[];
  style: 'solid' | 'outline' | 'compact';
}

interface TravelConfig {
  fromVw: number;
  toVw: number;
}

@Component({
  selector: 'app-velocity-scroll-section',
  standalone: true,
  templateUrl: './velocity-scroll-section.html',
  styleUrls: ['./velocity-scroll-section.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VelocityScrollSectionComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  @ViewChild('sectionRef', { static: true })
  sectionRef!: ElementRef<HTMLElement>;
  @ViewChildren('track') trackRefs!: QueryList<ElementRef<HTMLElement>>;

  readonly reducedMotion = signal(false);
  readonly nameVisible = signal(false);

  readonly rows: MarqueeRow[] = [
    { words: ['ANGULAR', 'TYPESCRIPT', 'THREE.JS', 'TAILWIND', 'NODE'], style: 'solid' },
    { words: ['DESIGN', 'CODE', 'SHIP', 'REPEAT'], style: 'outline' },
    { words: ['UI SYSTEMS', 'MOTION', 'PERFORMANCE', 'DETAIL'], style: 'compact' },
  ];

  private readonly travel: TravelConfig[] = [
    { fromVw: 105, toVw: -105 },
    { fromVw: -85, toVw: 85 },
    { fromVw: 125, toVw: -125 },
  ];

  private static readonly LERP_FACTOR = 0.1;
  private static readonly SETTLE_EPSILON = 0.00008;
  private targetProgress = 0;
  private currentProgress = 0;
  private rafId: number | null = null;
  private scrollHandler: (() => void) | null = null;
  private resizeHandler: (() => void) | null = null;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.reducedMotion.set(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (this.reducedMotion()) {
      this.nameVisible.set(true);
      return;
    }

    this.scrollHandler = () => this.onScroll();
    this.resizeHandler = () => this.onScroll();
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
    window.addEventListener('resize', this.resizeHandler, { passive: true });
    this.onScroll();
  }

  private onScroll(): void {
    const section = this.sectionRef.nativeElement;
    const totalTravel = section.offsetHeight - window.innerHeight;
    if (totalTravel <= 0) return;

    this.targetProgress = this.clamp(-section.getBoundingClientRect().top / totalTravel, 0, 1);
    if (this.rafId === null) this.rafId = requestAnimationFrame(this.frame);
  }

  private readonly frame = (): void => {
    const previous = this.currentProgress;
    this.currentProgress += (this.targetProgress - this.currentProgress) * VelocityScrollSectionComponent.LERP_FACTOR;
    const skew = this.clamp((this.currentProgress - previous) * -1200, -8, 8);
    const viewportWidth = window.innerWidth;
    const tracks = this.trackRefs.toArray();

    tracks.forEach((track, index) => {
      const config = this.travel[index];
      if (!config) return;
      const x = (config.fromVw + (config.toVw - config.fromVw) * this.currentProgress) * viewportWidth / 100;
      track.nativeElement.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0) skewX(${skew.toFixed(2)}deg)`;
    });

    if (this.currentProgress > 0.35) this.nameVisible.set(true);

    if (Math.abs(this.targetProgress - this.currentProgress) < VelocityScrollSectionComponent.SETTLE_EPSILON) {
      this.currentProgress = this.targetProgress;
      tracks.forEach((track) => {
        track.nativeElement.style.transform = track.nativeElement.style.transform.replace(/skewX\([^)]+\)/, 'skewX(0deg)');
      });
      this.rafId = null;
      return;
    }

    this.rafId = requestAnimationFrame(this.frame);
  };

  private clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.scrollHandler) window.removeEventListener('scroll', this.scrollHandler);
    if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler);
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
  }
}
