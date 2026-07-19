import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostBinding,
  inject,
  NgZone,
  signal,
  viewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, stagger, JSAnimation } from 'animejs';
// --- Types ---
type MarqueeStyle = 'solid' | 'outline' | 'compact';

interface MarqueeRow {
  words: string[];
  style: MarqueeStyle;
  direction: 1 | -1;
  baseSpeed: number;
}

@Component({
  selector: 'app-velocity-scroll-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './velocity-scroll-section.html',
  styleUrls: ['./velocity-scroll-section.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VelocityScrollSectionComponent {
  // --- Injections ---
  private readonly destroyRef = inject(DestroyRef);
  private readonly ngZone = inject(NgZone);
  private readonly hostElement = inject(ElementRef<HTMLElement>);

  // --- Signals & Host Bindings ---
  readonly reducedMotion = signal(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  private readonly isFastSignal = signal(false);

  // Native Angular way to toggle classes. No effect() or DOM queries needed!
  @HostBinding('class.is-fast')
  get isFastClass(): boolean {
    return this.isFastSignal();
  }

  // --- Configuration ---
  readonly copies = [0, 1, 2, 3, 4, 5]; // 6 copies ensure seamless wrap on all tracks including compact row

  readonly rows: MarqueeRow[] = [
    { words: ['ANGULAR', 'TYPESCRIPT', 'THREE.JS', 'TAILWIND', 'NODE'], style: 'solid', direction: -1, baseSpeed: 0 },
    { words: ['DESIGN', 'CODE', 'SHIP', 'REPEAT', 'DEPLOY'], style: 'outline', direction: 1, baseSpeed: 0 },
    { words: ['UI SYSTEMS', 'MOTION', 'PERFORMANCE', 'DETAIL', 'DEPTH'], style: 'compact', direction: -1, baseSpeed: 0 },
  ];

  // --- View Queries ---
  readonly tracks = viewChildren<ElementRef<HTMLElement>>('track');

  // --- Physics & Render State ---
  private rAFId: number | null = null;
  private positions: number[] = [];
  private sequenceWidths: number[] = [];
  private velocityBoost = 0;
  private lastScrollY = 0;
  public sectionProgress = 0;
  private entranceAnimations: JSAnimation[] = [];
  private resizeObserver: ResizeObserver | null = null;

  // DATA STRUCTURE: WeakMap for O(1) DOM node caching in hot rAF loop
  private trackCache = new WeakMap<ElementRef<HTMLElement>, HTMLElement>();

  constructor() {
    // Defer DOM manipulation until the view is fully rendered
    afterNextRender(() => {
      this.ngZone.runOutsideAngular(() => {
        this.initializeMarquee();
        this.playEntranceAnimation();
      });
    });
  }

  // --- Initialization ---
  private initializeMarquee(): void {
    const trackElements = this.tracks();
    if (!trackElements.length) return;

    // Initialize arrays
    this.positions = new Array(trackElements.length).fill(0);
    this.sequenceWidths = new Array(trackElements.length).fill(0);

    // Cache dimensions and force GPU compositing layers
    trackElements.forEach((trackRef, index) => {
      const el = trackRef.nativeElement;
      this.trackCache.set(trackRef, el); // Cache DOM node O(1)
      const sequence = el.querySelector('.marquee__sequence') as HTMLElement | null;

      // Fallback to scrollWidth if width is 0 (e.g., hidden on init)
      this.sequenceWidths[index] = sequence
        ? sequence.getBoundingClientRect().width
        : el.scrollWidth / this.copies.length;

      el.style.willChange = 'transform';
      el.style.transform = 'translate3d(0, 0, 0)';
    });

    // 1. Scroll Listener (Math only, zero DOM manipulation)
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - this.lastScrollY;
      this.lastScrollY = currentScrollY;

      // PROGRESSIVE VELOCITY: Directional accumulation
      if (deltaY !== 0) {
        const isMobile = window.innerWidth < 768;
        const multiplier = isMobile ? 0.12 : 0.18;
        this.velocityBoost += deltaY * multiplier;
        // Clamp to prevent visual chaos, allow full negative for upward scroll reversal
        const maxBoost = isMobile ? 12 : 25;
        this.velocityBoost = Math.max(-maxBoost, Math.min(this.velocityBoost, maxBoost));
      }

      const section = document.querySelector('.velocity-section');
      if (section) {
        const rect = section.getBoundingClientRect();
        const scrollableHeight = rect.height - window.innerHeight;
        this.sectionProgress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));
      }
    };

    // 2. ResizeObserver for robust width calculation (fixes font-load jumping glitch)
    this.resizeObserver = new ResizeObserver(() => {
      trackElements.forEach((trackRef, index) => {
        const el = trackRef.nativeElement;
        const sequence = el.querySelector('.marquee__sequence') as HTMLElement | null;
        if (sequence) {
          this.sequenceWidths[index] = sequence.getBoundingClientRect().width;
        }
      });
    });

    trackElements.forEach(trackRef => {
      const sequence = trackRef.nativeElement.querySelector('.marquee__sequence');
      if (sequence) {
        this.resizeObserver!.observe(sequence);
      }
    });

    window.addEventListener('scroll', onScroll, { passive: true });

    // 3. Start the buttery-smooth render loop
    this.startRenderLoop();

    // 4. Register cleanup
    this.destroyRef.onDestroy(() => {
      window.removeEventListener('scroll', onScroll);
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
      }

      if (this.rAFId !== null) {
        cancelAnimationFrame(this.rAFId);
        this.rAFId = null;
      }
    });
  }

  // --- Render Loop ---
  private startRenderLoop(): void {
    const trackElements = this.tracks();

    const loop = () => {
      // A. Friction: Smoothly decay the velocity boost back to 0
      const isMobileFriction = window.innerWidth < 768;
      this.velocityBoost *= isMobileFriction ? 0.95 : 0.91;
      if (Math.abs(this.velocityBoost) < 0.05) {
        this.velocityBoost = 0;
      }

      // B. Update reactive signal (threshold prevents CSS flickering on micro-jitters)
      this.isFastSignal.set(Math.abs(this.velocityBoost) > 1.5);

      // C. Update each track's transform
      trackElements.forEach((trackRef, index) => {
        // O(1) WeakMap lookup avoids expensive getter in 60fps loop
        const el = this.trackCache.get(trackRef)!;
        const row = this.rows[index];
        const sequenceWidth = this.sequenceWidths[index];

        if (sequenceWidth <= 0) return;

        // Calculate effective speed: base speed + progressive boost + mobile auto-scroll
        const isMobile = window.innerWidth < 768;
        const autoScrollSpeed = isMobile ? 1.5 : 0; // Auto-scroll on mobile since it's not sticky
        const effectiveSpeed = (row.baseSpeed + autoScrollSpeed + this.velocityBoost) * row.direction;
        this.positions[index] += effectiveSpeed;

        // D. Modulo-based seamless wrap-around (works in both scroll directions)
        // Keeps position always in range [-sequenceWidth, 0)
        this.positions[index] = ((this.positions[index] % sequenceWidth) + sequenceWidth) % sequenceWidth - sequenceWidth;

        // E. Apply GPU transform + Dynamic Skew (The "Speed" visual cue)
        const skew = Math.max(-4, Math.min(4, this.velocityBoost * 0.25 * row.direction));
        el.style.transform = `translate3d(${this.positions[index]}px, 0, 0) skewX(${skew}deg)`;
      });

      this.rAFId = requestAnimationFrame(loop);
    };

    this.rAFId = requestAnimationFrame(loop);
  }

  // --- Entrance Animation ---
  private playEntranceAnimation(): void {
    const host = this.hostElement.nativeElement;

    // 1. Animate Meta Header
    const stageMeta = host.querySelector('.stage-meta');
    if (stageMeta) {
      this.entranceAnimations.push(
        animate(stageMeta, {
          opacity: [0, 1],
          translateY: ['1rem', '0rem'],
          duration: 800,
          ease: 'outExpo',
        })
      );
    }

    // 2. Animate Marquee Parents (NOT the tracks, rAF controls the tracks)
    const marquees = host.querySelectorAll('.marquee');
    marquees.forEach((el: Element, i: number) => {
      const dir = this.rows[i]?.direction ?? -1;
      this.entranceAnimations.push(
        animate(el, {
          opacity: [0, 1],
          translateX: [`${dir * -60}px`, '0px'],
          duration: 1000,
          delay: 200 + i * 150,
          ease: 'outExpo',
        })
      );
    });

    // 3. Animate Dots
    const dots = host.querySelectorAll('.marquee__dot');
    if (dots.length) {
      this.entranceAnimations.push(
        animate(dots, {
          scale: [0, 1],
          duration: 500,
          delay: stagger(30, { start: 400 }),
          ease: 'outElastic(1, 0.6)',
        })
      );
    }
  }
}