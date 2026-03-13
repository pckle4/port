import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  ViewChild,
  inject
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface Particle {
  radius: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  accel: number;
  decay: number;
  life: number;
}

@Component({
  selector: 'app-magic-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './magic-loader.html',
  styleUrls: ['./magic-loader.css'],
  host: { style: 'display: contents' }
})
export class MagicLoaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() size = 200;
  @Input() particleCount = 1;
  @Input() speed = 1;
  @Input() hueRange: [number, number] = [0, 360];
  @Input() saturation = 100;
  @Input() lightness = 60;
  @Output() onComplete = new EventEmitter<void>();
  @ViewChild('magicCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private animationFrameId?: number;
  private completionTimeoutId?: ReturnType<typeof setTimeout>;
  private particles: Particle[] = [];
  private tick = 0;
  private globalAngle = 0;
  private globalRotation = 0;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.completionTimeoutId = setTimeout(() => {
        this.onComplete.emit();
      }, 1200);
    }
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.setupCanvas();
    this.ngZone.runOutsideAngular(() => this.animate());
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    if (this.completionTimeoutId) {
      clearTimeout(this.completionTimeoutId);
    }
  }

  private createParticle(centerX: number, centerY: number, minSize: number): Particle {
    return {
      radius: 7,
      x: centerX + Math.cos(this.tick / 20) * minSize / 2,
      y: centerY + Math.sin(this.tick / 20) * minSize / 2,
      angle: this.globalRotation + this.globalAngle,
      speed: 0,
      accel: 0.01,
      decay: 0.01,
      life: 1
    };
  }

  private stepParticle(particle: Particle, index: number) {
    particle.speed += particle.accel;
    particle.x += Math.cos(particle.angle) * particle.speed * this.speed;
    particle.y += Math.sin(particle.angle) * particle.speed * this.speed;
    particle.angle += Math.PI / 64;
    particle.accel *= 1.01;
    particle.life -= particle.decay;

    if (particle.life <= 0) {
      this.particles.splice(index, 1);
    }
  }

  private drawParticle(
    ctx: CanvasRenderingContext2D,
    particle: Particle,
    index: number,
    currentLightness: number
  ) {
    const hueSpan = this.hueRange[1] - this.hueRange[0];
    const hue = hueSpan === 0
      ? this.hueRange[0]
      : this.hueRange[0] + ((this.tick + (particle.life * 120)) % hueSpan);

    ctx.fillStyle = ctx.strokeStyle =
      `hsla(${hue}, ${this.saturation}%, ${currentLightness}%, ${particle.life})`;

    ctx.beginPath();
    if (this.particles[index - 1]) {
      ctx.moveTo(particle.x, particle.y);
      ctx.lineTo(this.particles[index - 1].x, this.particles[index - 1].y);
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, Math.max(0.001, particle.life * particle.radius), 0, Math.PI * 2);
    ctx.fill();

    const sparkleSize = Math.random() * 1.25;
    const sparkleX = particle.x + ((Math.random() - 0.5) * 35) * particle.life;
    const sparkleY = particle.y + ((Math.random() - 0.5) * 35) * particle.life;
    ctx.fillRect(Math.floor(sparkleX), Math.floor(sparkleY), sparkleSize, sparkleSize);
  }

  private setupCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    canvas.width = this.size * dpr;
    canvas.height = this.size * dpr;
    canvas.style.width = `${this.size}px`;
    canvas.style.height = `${this.size}px`;

    ctx.scale(dpr, dpr);
    ctx.globalCompositeOperation = 'source-over';

    this.particles = [];
    this.tick = 0;
    this.globalAngle = 0;
    this.globalRotation = 0;
  }

  private animate = () => {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const centerX = this.size / 2;
    const centerY = this.size / 2;
    const minSize = this.size * 0.5;

    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(this.createParticle(centerX, centerY, minSize));
    }

    this.particles.forEach((particle, index) => {
      this.stepParticle(particle, index);
    });

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const hasClassDark = document.documentElement.classList.contains('dark');
    const storedTheme = localStorage.getItem('angular-ui-theme') ?? localStorage.getItem('vite-ui-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark =
      hasClassDark ||
      storedTheme === 'dark' ||
      (storedTheme === 'system' && prefersDark) ||
      (!storedTheme && prefersDark);

    const currentLightness = isDark ? 100 : 0;

    this.particles.forEach((particle, index) => {
      this.drawParticle(ctx, particle, index, currentLightness);
    });

    this.globalRotation += Math.PI / 6 * this.speed;
    this.globalAngle += Math.PI / 6 * this.speed;
    this.tick++;

    this.animationFrameId = requestAnimationFrame(this.animate);
  };
}
