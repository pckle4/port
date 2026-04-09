import { Component, Input, OnInit, OnDestroy, PLATFORM_ID, inject, NgZone, AfterViewInit, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';
import { CLOUD_OPTIONS } from './icon-cloud.config';
import { renderIconDataUri, slugToIcon } from './icon-cloud.utils';
import { buildStableGlobeConnections, GlobeConnection, GlobeIconPoint, render3DGlobe } from './globe-renderer';

let tagCanvasLoaded = false;

@Component({
  selector: 'app-icon-cloud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon-cloud.html',
  styleUrls: ['./icon-cloud.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconCloudComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input() iconSlugs: string[] = [];
  @Input() forcedTheme?: string;

  @ViewChild('globeCanvas', { static: false }) globeCanvasRef?: ElementRef<HTMLCanvasElement>;

  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);
  private themeService = inject(ThemeService);

  private canvasId = 'tc-canvas-' + Math.random().toString(36).slice(2, 9);
  private containerId = 'tc-container-' + Math.random().toString(36).slice(2, 9);
  private listId = 'tc-list-' + Math.random().toString(36).slice(2, 9);
  private hasStarted = false;
  private observer?: IntersectionObserver;
  private themeListener?: () => void;
  private mediaQuery?: MediaQueryList;
  private mediaHandler?: (e: MediaQueryListEvent) => void;
  private themeRafId: number | null = null;
  private globeRafId: number | null = null;
  private globeStartTime: number = 0;
  private lastIconPoints: GlobeIconPoint[] = [];
  private stableConnections: GlobeConnection[] = [];
  private stableConnectionPointCount = 0;
  private stableConnectionsLocked = false;
  private connectionWarmupUntil = 0;

  resolvedTheme = 'dark';
  iconElements: { src: string; title: string }[] = [];
  canvasIdAttr = '';
  containerIdAttr = '';
  listIdAttr = '';

  ngOnInit() {
    this.canvasIdAttr = this.canvasId;
    this.containerIdAttr = this.containerId;
    this.listIdAttr = this.listId;
    this.resolveTheme();
    this.buildIcons();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['iconSlugs'] || changes['forcedTheme']) {
      this.resolveTheme();
      this.buildIcons();
      if (this.hasStarted && isPlatformBrowser(this.platformId)) {
        this.ngZone.runOutsideAngular(() => this.restart());
      }
    }
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.themeListener = () => {
      if (this.themeRafId !== null) {
        cancelAnimationFrame(this.themeRafId);
      }
      this.themeRafId = requestAnimationFrame(() => {
        this.themeRafId = null;
        this.syncThemeAndIcons();
      });
    };

    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('theme-changed', this.themeListener!);
      window.addEventListener('storage', this.themeListener!);

      if (!this.forcedTheme) {
        this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        this.mediaHandler = () => {
          if (this.themeService.theme() === 'system') {
            this.syncThemeAndIcons();
          }
        };
        this.mediaQuery.addEventListener('change', this.mediaHandler);
      }

      const container = document.getElementById(this.containerId);
      if (!container) return;

      this.observer = new IntersectionObserver((entries) => {
        const isVisible = entries.some(e => e.isIntersecting);
        if (isVisible) {
          this.startTagCanvas();
        } else if (this.hasStarted) {
          this.pauseTagCanvas();
        }
      }, { threshold: 0.1 });
      this.observer.observe(container);
    });
  }

  private resolveTheme() {
    if (this.forcedTheme) {
      this.resolvedTheme = this.forcedTheme;
      return;
    }
    const stored = this.themeService.theme();
    if (stored === 'system') {
      if (typeof window !== 'undefined') {
        this.resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        this.resolvedTheme = 'dark';
      }
      return;
    }
    this.resolvedTheme = stored || 'dark';
  }

  private syncThemeAndIcons(): void {
    const prev = this.resolvedTheme;
    this.resolveTheme();
    if (prev === this.resolvedTheme) return;

    this.ngZone.run(() => {
      this.buildIcons();
      this.cdr.markForCheck();
    });

    if (this.hasStarted) {
      this.ngZone.runOutsideAngular(() => this.restart());
    }
  }

  private buildIcons() {
    this.resetStableConnections();
    this.iconElements = this.iconSlugs
      .map((slug) => {
        const icon = slugToIcon[slug];
        if (!icon) return null;
        return renderIconDataUri(icon, this.resolvedTheme);
      })
      .filter((x): x is { src: string; title: string } => !!x);
  }

  private resetStableConnections() {
    this.stableConnections = [];
    this.stableConnectionPointCount = 0;
    this.stableConnectionsLocked = false;
    this.connectionWarmupUntil = 0;
  }

  private lastConnectionCalcTime = 0;

  private startGlobeAnimation() {
    if (this.globeRafId !== null) return;
    if (!this.globeCanvasRef?.nativeElement) return;
    const canvas = this.globeCanvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      this.globeRafId = requestAnimationFrame(() => {
        this.globeRafId = null;
        this.startGlobeAnimation();
      });
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    if (this.globeStartTime === 0) this.globeStartTime = performance.now();
    if (this.connectionWarmupUntil === 0) {
      this.connectionWarmupUntil = performance.now() + 1200;
    }

    const loop = (time: number) => {
      const elapsed = time - this.globeStartTime;
      const sampledPoints = this.getIconAnchorPoints(rect.width, rect.height);
      const iconPoints = sampledPoints.length > 1 ? sampledPoints : this.lastIconPoints;
      if (sampledPoints.length > 1) {
        this.lastIconPoints = sampledPoints;
      }
      if (iconPoints.length > 1) {
        const pointCountChanged = this.stableConnectionPointCount !== iconPoints.length;
        const expectedIconCount = this.iconElements.length;
        const hasFullPointSample = expectedIconCount > 0 && iconPoints.length >= expectedIconCount;
        const inWarmup = performance.now() < this.connectionWarmupUntil;
        const warmupThrottle = inWarmup && (performance.now() - this.lastConnectionCalcTime > 50);

        const shouldRefreshConnections =
          this.stableConnections.length === 0 ||
          pointCountChanged ||
          !this.stableConnectionsLocked ||
          warmupThrottle;

        if (shouldRefreshConnections) {
          this.stableConnections = buildStableGlobeConnections(iconPoints);
          this.stableConnectionPointCount = iconPoints.length;
          this.lastConnectionCalcTime = performance.now();
        }

        if ((hasFullPointSample || !inWarmup) && this.stableConnections.length > 0) {
          this.stableConnectionsLocked = true;
        }
      } else {
        this.resetStableConnections();
      }

      render3DGlobe(
        ctx,
        rect.width,
        rect.height,
        elapsed,
        this.resolvedTheme,
        iconPoints,
        this.stableConnections
      );
      this.globeRafId = requestAnimationFrame(loop);
    };
    this.globeRafId = requestAnimationFrame(loop);
  }

  private getIconAnchorPoints(overlayWidth: number, overlayHeight: number): GlobeIconPoint[] {
    try {
      const TC = (window as any).TagCanvas;
      const tc = TC?.tc?.[this.canvasId];
      if (!tc || !Array.isArray(tc.taglist)) return [];

      const canvas = tc.canvas as HTMLCanvasElement | undefined;
      const cw = canvas?.width || 1000;
      const ch = canvas?.height || 1000;
      const xoff = cw / 2 + (tc.offsetX || 0);
      const yoff = ch / 2 + (tc.offsetY || 0);
      const maxRadius = tc.max_radius || 100;

      return tc.taglist
        .map((tag: any) => {
          if (typeof tag?.x !== 'number' || typeof tag?.y !== 'number') return null;
          const scale = typeof tag.sc === 'number' ? tag.sc : 1;
          const ix = xoff + tag.x * scale;
          const iy = yoff + tag.y * scale;
          const depthRaw = typeof tag.z === 'number'
            ? (maxRadius - tag.z) / (2 * maxRadius)
            : 0.5;
          const depth = Math.max(0, Math.min(1, depthRaw));

          return {
            x: (ix / cw) * overlayWidth,
            y: (iy / ch) * overlayHeight,
            depth
          } as GlobeIconPoint;
        })
        .filter((p: GlobeIconPoint | null): p is GlobeIconPoint => !!p);
    } catch {
      return [];
    }
  }

  private stopGlobeAnimation() {
    if (this.globeRafId !== null) {
      cancelAnimationFrame(this.globeRafId);
      this.globeRafId = null;
    }
  }

  private startTagCanvas() {
    try {
      if (!tagCanvasLoaded) {
        const TC = (window as any).TagCanvas;
        if (!TC) {
          import('tag-canvas').then((mod) => {
            if (!(window as any).TagCanvas) {
              (window as any).TagCanvas = mod.default || mod;
            }
            tagCanvasLoaded = true;
            this.doStart();
          });
          return;
        }
        tagCanvasLoaded = true;
      }
      this.doStart();
    } catch (e) {
      console.warn('TagCanvas start failed:', e);
    }
  }

  private doStart() {
    const TC = (window as any).TagCanvas;
    if (!TC) return;
    try {
      if (this.hasStarted) {
        TC.Resume(this.canvasId);
        this.startGlobeAnimation();
      } else {
        setTimeout(() => {
          try {
            TC.Start(this.canvasId, this.listId, CLOUD_OPTIONS);
            this.hasStarted = true;
            this.startGlobeAnimation();
          } catch (e) {
            console.warn('TagCanvas.Start failed:', e);
          }
        }, 50);
      }
    } catch (e) {
      console.warn('TagCanvas operation failed:', e);
    }
  }

  private pauseTagCanvas() {
    try {
      const TC = (window as any).TagCanvas;
      if (TC && this.hasStarted) {
        TC.Pause(this.canvasId);
        this.stopGlobeAnimation();
      }
    } catch (e) {}
  }

  private restart() {
    if (!isPlatformBrowser(this.platformId)) return;
    const TC = (window as any).TagCanvas;
    if (!TC) return;
    if (!this.hasStarted) return;

    setTimeout(() => {
      try {
        TC.Update(this.canvasId);
      } catch (e) {
        console.warn('TagCanvas update failed:', e);
      }
    }, 100);
  }

  ngOnDestroy() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.ngZone.runOutsideAngular(() => {
      if (this.themeListener) {
        window.removeEventListener('theme-changed', this.themeListener);
        window.removeEventListener('storage', this.themeListener);
      }
      if (this.mediaQuery && this.mediaHandler) {
        this.mediaQuery.removeEventListener('change', this.mediaHandler);
      }
      this.observer?.disconnect();
      if (this.themeRafId !== null) cancelAnimationFrame(this.themeRafId);
      this.stopGlobeAnimation();
      try {
        const TC = (window as any).TagCanvas;
        if (TC && this.hasStarted) {
          TC.Delete(this.canvasId);
        }
      } catch (e) {}
    });
  }
}
