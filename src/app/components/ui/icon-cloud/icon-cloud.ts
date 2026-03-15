import { Component, Input, OnInit, OnDestroy, PLATFORM_ID, inject, NgZone, AfterViewInit, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';
import {
  siTypescript,
  siJavascript,
  siReact,
  siNodedotjs,
  siPostgresql,
  siMongodb,
  siTailwindcss,
  siDocker,
  siGit,
  siGithub,
  siPython,
  siHtml5,
  siCss,
  siNextdotjs,
  siVercel,
  siVite,
  siFigma,
  siApachekafka,
  siNginx,
  siGraphql,
  siRedis,
  siDotnet,
  siKubernetes,
  siLinux,
  siAndroid
} from 'simple-icons';

type SimpleIcon = { title: string; slug: string; hex: string; path: string; };

const slugToIcon: Record<string, SimpleIcon> = {
  typescript: siTypescript as any,
  javascript: siJavascript as any,
  react: siReact as any,
  nodedotjs: siNodedotjs as any,
  postgresql: siPostgresql as any,
  mongodb: siMongodb as any,
  tailwindcss: siTailwindcss as any,
  docker: siDocker as any,
  git: siGit as any,
  github: siGithub as any,
  python: siPython as any,
  html5: siHtml5 as any,
  css3: siCss as any,
  nextdotjs: siNextdotjs as any,
  vercel: siVercel as any,
  vite: siVite as any,
  figma: siFigma as any,
  apachekafka: siApachekafka as any,
  nginx: siNginx as any,
  graphql: siGraphql as any,
  redis: siRedis as any,
  dotnet: siDotnet as any,
  kubernetes: siKubernetes as any,
  linux: siLinux as any,
  android: siAndroid as any,
};

function hexToRgb(hex: string): [number, number, number] {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  const n = parseInt(hex, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function luminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}
function contrastRatio(hex1: string, hex2: string): number {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  const l1 = luminance(r1, g1, b1);
  const l2 = luminance(r2, g2, b2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function renderIconDataUri(icon: SimpleIcon, theme: string): { src: string; title: string } {
  const bgHex = theme === 'light' ? '#f3f2f1' : '#080510';
  const fallbackHex = theme === 'light' ? '#6e6e73' : '#ffffff';
  const minContrastRatio = theme === 'dark' ? 2 : 1.2;
  const originalHex = '#' + icon.hex;
  const isAccessible = contrastRatio(bgHex, originalHex) > minContrastRatio;
  const [r, g, b] = hexToRgb(isAccessible ? originalHex : fallbackHex);
  const size = 40;
  const src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" style="fill: rgb(${r}, ${g}, ${b});" viewBox="0 0 24 24" height="${size}px" width="${size}px"><title>${encodeURIComponent(icon.title)}</title><path d="${icon.path}"></path></svg>`;
  return { src, title: icon.title };
}

const CLOUD_OPTIONS: Record<string, any> = {
  reverse: true,
  depth: 1,
  wheelZoom: false,
  imageScale: 2,
  activeCursor: 'default',
  tooltip: 'native',
  initial: [0.1, -0.1],
  clickToFront: 500,
  tooltipDelay: 0,
  outlineColour: '#0000',
  maxSpeed: 0.03,
  minSpeed: 0.01,
  dragControl: true,
  decel: 0.98,
  pinchZoom: false,
  freezeActive: true,
  freezeDecel: true,
  textFont: null,
  textColour: null,
};

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

  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private themeService = inject(ThemeService);

  private canvasId = 'tc-canvas-' + Math.random().toString(36).slice(2, 9);
  private containerId = 'tc-container-' + Math.random().toString(36).slice(2, 9);
  private hasStarted = false;
  private observer?: IntersectionObserver;
  private themeListener?: () => void;
  private mediaQuery?: MediaQueryList;
  private mediaHandler?: (e: MediaQueryListEvent) => void;
  private themeRafId: number | null = null;

  resolvedTheme = 'dark';
  iconElements: { src: string; title: string }[] = [];
  canvasIdAttr = '';
  containerIdAttr = '';

  ngOnInit() {
    this.canvasIdAttr = this.canvasId;
    this.containerIdAttr = this.containerId;
    this.resolveTheme();
    this.buildIcons();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['iconSlugs'] || changes['forcedTheme']) {
      this.resolveTheme();
      this.buildIcons();
      if (this.hasStarted && isPlatformBrowser(this.platformId)) {
        this.restart();
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
    window.addEventListener('theme-changed', this.themeListener);

    window.addEventListener('storage', this.themeListener);

    if (!this.forcedTheme) {
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.mediaHandler = () => {
        if (this.themeService.theme() === 'system') {
          this.syncThemeAndIcons();
        }
      };
      this.mediaQuery.addEventListener('change', this.mediaHandler);
    }

    this.ngZone.runOutsideAngular(() => {
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
    } else {
      this.resolvedTheme = stored || 'dark';
    }
  }

  private syncThemeAndIcons(): void {
    const previousTheme = this.resolvedTheme;
    this.resolveTheme();
    if (previousTheme === this.resolvedTheme) return;

    this.buildIcons();
    if (this.hasStarted) {
      this.restart();
    }
  }

  private buildIcons() {
    this.iconElements = this.iconSlugs
      .map(slug => {
        const icon = slugToIcon[slug];
        if (!icon) return null;
        return renderIconDataUri(icon, this.resolvedTheme);
      })
      .filter((x): x is { src: string; title: string } => !!x);
  }

  private startTagCanvas() {
    this.ngZone.runOutsideAngular(() => {
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
    });
  }

  private doStart() {
    const TC = (window as any).TagCanvas;
    if (!TC) return;
    try {
      if (this.hasStarted) {
        TC.Resume(this.canvasId);
      } else {
        setTimeout(() => {
          try {
            TC.Start(this.canvasId, null, CLOUD_OPTIONS);
            this.hasStarted = true;
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
      }
    } catch (e) {}
  }

  private restart() {
    if (!isPlatformBrowser(this.platformId)) return;
    const TC = (window as any).TagCanvas;
    if (!TC) return;
    if (!this.hasStarted) return;

    try {
      TC.Delete(this.canvasId);
      this.hasStarted = false;
    } catch (e) {}
    setTimeout(() => this.startTagCanvas(), 100);
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const TC = (window as any).TagCanvas;
        if (TC && this.hasStarted) {
          TC.Delete(this.canvasId);
        }
      } catch (e) {}
      if (this.observer) this.observer.disconnect();
      if (this.themeListener) {
        window.removeEventListener('theme-changed', this.themeListener);
        window.removeEventListener('storage', this.themeListener);
      }
      if (this.mediaQuery && this.mediaHandler) {
        this.mediaQuery.removeEventListener('change', this.mediaHandler);
      }
      if (this.themeRafId !== null) {
        cancelAnimationFrame(this.themeRafId);
      }
    }
  }
}
