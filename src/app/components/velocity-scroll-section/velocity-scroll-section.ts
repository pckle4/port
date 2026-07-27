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
  NgZone,
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
  private readonly ngZone = inject(NgZone);

  @ViewChild('sectionRef', { static: true })
  sectionRef!: ElementRef<HTMLElement>;
  @ViewChildren('track') trackRefs!: QueryList<ElementRef<HTMLElement>>;

  readonly reducedMotion = signal(false);
  readonly nameVisible = signal(true); // default to true since there's no progress based reveal

  readonly rows: MarqueeRow[] = [
    { words: ['ANGULAR', 'TYPESCRIPT', 'JAVA', 'SPRING BOOT', 'NODE', 'GRPC'], style: 'solid' },
    { words: ['AI', 'ML', 'DESIGN', 'CODE', 'SHIP', 'REPEAT'], style: 'outline' },
    { words: ['UI SYSTEMS', 'MOTION', 'PERFORMANCE', 'DETAIL'], style: 'compact' },
  ];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.reducedMotion.set(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  ngOnDestroy(): void {
    // Cleaned up listeners
  }
}
