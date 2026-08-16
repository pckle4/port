import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
  PLATFORM_ID,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  SphereGeometry,
  MeshBasicMaterial,
  Color,
  Mesh,
  Group,
  InstancedMesh,
  Matrix4,
  TubeGeometry,
  CatmullRomCurve3,
  Vector3,
  CanvasTexture,
} from 'three';

export type Rgba = { r: number; g: number; b: number; a: number };

export interface GlobeMarker {
  lat: number;
  lng: number;
  label?: string;
  color?: string;
}

export interface MarkerConfig {
  markers: GlobeMarker[];
  color: string;
  size: number;
}

export interface DotsConfig {
  color: string;
  size: number;
  density: number;
  allDots: boolean;
}

function parseColorToRgba(input: string): Rgba {
  if (!input || input.trim() === '') return { r: 0, g: 0, b: 0, a: 0 };
  const str = input.trim();
  const rgbaMatch = str.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)/i
  );
  if (rgbaMatch) {
    const r = Math.max(0, Math.min(255, parseFloat(rgbaMatch[1]))) / 255;
    const g = Math.max(0, Math.min(255, parseFloat(rgbaMatch[2]))) / 255;
    const b = Math.max(0, Math.min(255, parseFloat(rgbaMatch[3]))) / 255;
    const a =
      rgbaMatch[4] !== undefined
        ? Math.max(0, Math.min(1, parseFloat(rgbaMatch[4])))
        : 1;
    return { r, g, b, a };
  }
  const hex = str.replace(/^#/, '');
  if (hex.length === 8) {
    return {
      r: parseInt(hex.slice(0, 2), 16) / 255,
      g: parseInt(hex.slice(2, 4), 16) / 255,
      b: parseInt(hex.slice(4, 6), 16) / 255,
      a: parseInt(hex.slice(6, 8), 16) / 255,
    };
  }
  if (hex.length === 6) {
    return {
      r: parseInt(hex.slice(0, 2), 16) / 255,
      g: parseInt(hex.slice(2, 4), 16) / 255,
      b: parseInt(hex.slice(4, 6), 16) / 255,
      a: 1,
    };
  }
  if (hex.length === 4) {
    return {
      r: parseInt(hex[0] + hex[0], 16) / 255,
      g: parseInt(hex[1] + hex[1], 16) / 255,
      b: parseInt(hex[2] + hex[2], 16) / 255,
      a: parseInt(hex[3] + hex[3], 16) / 255,
    };
  }
  if (hex.length === 3) {
    return {
      r: parseInt(hex[0] + hex[0], 16) / 255,
      g: parseInt(hex[1] + hex[1], 16) / 255,
      b: parseInt(hex[2] + hex[2], 16) / 255,
      a: 1,
    };
  }
  return { r: 0, g: 0, b: 0, a: 1 };
}

function mapLinear(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  if (inMax === inMin) return outMin;
  const t = (value - inMin) / (inMax - inMin);
  return outMin + t * (outMax - outMin);
}

function mapSpeedUiToInternal(ui: number): number {
  if (ui === 0) return 0;
  const clamped = Math.max(0, Math.min(10, ui));
  return mapLinear(clamped, 0, 10, 0, 0.9);
}

function mapDensityUiToSpacing(ui: number): number {
  const clamped = Math.max(1, Math.min(10, ui));
  return mapLinear(clamped, 1, 10, 24, 8);
}

function mapScaleUiToMultiplier(ui: number): number {
  const clamped = Math.max(1, Math.min(20, ui));
  return mapLinear(clamped, 1, 20, 0.2, 2);
}

function mapDotSizeUiToMultiplier(ui: number): number {
  const clamped = Math.max(1, Math.min(10, ui));
  return mapLinear(clamped, 1, 10, 0.1, 0.5);
}

function mapMarkerDotSizeUiToMultiplier(ui: number): number {
  const clamped = Math.max(0, Math.min(100, ui));
  return mapLinear(clamped, 0, 100, 0.1, 2.5);
}

function normalizeSmoothing(ui: number): number {
  return Math.max(0, Math.min(1, ui / 10));
}

function mapDragSpeedUiToSensitivity(ui: number): number {
  return mapLinear(Math.max(0, Math.min(10, ui)), 0, 10, 0.001, 0.02);
}

function mapDetailToStepSize(ui: number): number {
  const clamped = Math.max(1, Math.min(10, ui));
  return mapLinear(clamped, 1, 10, 10, 1);
}

function simplifyRing(ring: number[][], detail: number): number[][] {
  if (ring.length < 2) return ring;
  if (detail >= 10) return ring;
  const stepSize = Math.max(1, Math.floor(mapDetailToStepSize(detail)));
  const simplified: number[][] = [];
  simplified.push(ring[0]);
  for (let i = stepSize; i < ring.length - 1; i += stepSize) {
    const idx = Math.min(i, ring.length - 1);
    simplified.push(ring[idx]);
  }
  const lastPoint = ring[ring.length - 1];
  const firstPoint = ring[0];
  const isClosed =
    Math.abs(lastPoint[0] - firstPoint[0]) < 1e-4 &&
    Math.abs(lastPoint[1] - firstPoint[1]) < 1e-4;
  if (!isClosed) {
    simplified.push(lastPoint);
  }
  return simplified.length >= 2 ? simplified : ring;
}

function latLngToPosition(
  lat: number,
  lng: number
): { x: number; y: number; z: number } {
  const latRad = lat * (Math.PI / 180);
  const lngRad = lng * (Math.PI / 180);
  const x = Math.cos(latRad) * Math.sin(lngRad);
  const y = Math.sin(latRad);
  const z = Math.cos(latRad) * Math.cos(lngRad);
  return { x, y, z };
}

@Component({
  selector: 'app-interactive-globe',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="globe-viewport" #containerRef>
      @if (isLoading()) {
        <div class="globe-loader" aria-hidden="true">
          <span class="globe-spinner"></span>
          <span class="globe-loader__text">INITIALIZING GLOBE...</span>
        </div>
      }
      @if (error()) {
        <div class="globe-fallback">
          <p class="globe-fallback__title">Global Presence</p>
          <p class="globe-fallback__desc">Available for collaborations worldwide</p>
        </div>
      }
    </div>
  `,
  styleUrls: ['./interactive-globe.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractiveGlobeComponent implements OnInit, OnDestroy {
  @ViewChild('containerRef', { static: true }) containerRef!: ElementRef<HTMLDivElement>;

  @Input() speed = 1.6;
  @Input() smoothing = 8;
  @Input() dots: DotsConfig = {
    color: '#2d6320',
    size: 4.8,
    density: 7.5,
    allDots: false,
  };
  @Input() fill: 'dots' | 'solid' = 'dots';
  @Input() fillColor = '#2d6320';
  @Input() scale = 8;
  @Input() stopOnHover = false;
  @Input() markerConfig: MarkerConfig = {
    markers: [
      { lat: 20.5937, lng: 78.9629, label: 'India' },
      { lat: 37.7749, lng: -122.4194, label: 'San Francisco' },
      { lat: 51.5074, lng: -0.1278, label: 'London' },
      { lat: 1.3521, lng: 103.8198, label: 'Singapore' },
      { lat: 35.6762, lng: 139.6503, label: 'Tokyo' },
    ],
    color: '#cb5521',
    size: 40,
  };
  @Input() direction: 'left' | 'right' = 'left';
  @Input() initialLatitude = 20;
  @Input() initialLongitude = 78;
  @Input() oceanColor = 'rgba(26, 51, 0, 0.02)';
  @Input() outlineColor = 'rgba(26, 51, 0, 0.35)';
  @Input() showOutline = true;
  @Input() graticuleColor = 'rgba(26, 51, 0, 0.08)';
  @Input() showGrid = true;
  @Input() outlineWidth = 1.1;
  @Input() dragSpeed = 5;
  @Input() detail = 5;

  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);

  private readonly platformId = inject(PLATFORM_ID);
  private isBrowser = false;

  private scene: Scene | null = null;
  private camera: PerspectiveCamera | null = null;
  private renderer: WebGLRenderer | null = null;
  private globeGroup: Group | null = null;
  private animationFrameId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;

  private isDragging = false;
  private lastMouseX = 0;
  private lastMouseY = 0;
  private targetRotation = { x: 0, y: 0 };
  private rotation = { x: 0, y: 0 };
  private velocity = { x: 0, y: 0 };
  private rotationSpeed = 0;
  private lerpFactor = 0.05;
  private velocityDecay = 0.92;
  private smoothingN = 0.8;
  private boundOnMouseMove: ((e: MouseEvent) => void) | null = null;
  private boundOnMouseUp: (() => void) | null = null;
  private boundOnTouchMove: ((e: TouchEvent) => void) | null = null;
  private boundOnTouchEnd: (() => void) | null = null;

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      setTimeout(() => this.initThreeGlobe(), 0);
    }
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  private initThreeGlobe(): void {
    if (!this.containerRef?.nativeElement) return;
    const container = this.containerRef.nativeElement;
    const containerWidth = container.clientWidth || 500;
    const containerHeight = container.clientHeight || 500;

    let currentScale = this.scale;
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      currentScale = Math.max(1, currentScale - 1);
    }
    const scaleMultiplier = mapScaleUiToMultiplier(currentScale);
    const dotSpacing = mapDensityUiToSpacing(this.dots.density);
    const dotSizeMultiplier = mapDotSizeUiToMultiplier(this.dots.size);
    const markerRadiusMultiplier = mapMarkerDotSizeUiToMultiplier(this.markerConfig.size);
    this.smoothingN = normalizeSmoothing(this.smoothing);

    const baseRotationSpeed = mapSpeedUiToInternal(this.speed);
    this.rotationSpeed = this.direction === 'left' ? -baseRotationSpeed : baseRotationSpeed;
    this.lerpFactor = this.smoothingN === 0 ? 1 : mapLinear(this.smoothingN, 0, 1, 0.4, 0.03);
    this.velocityDecay = mapLinear(this.smoothingN, 0, 1, 0.7, 0.96);

    this.scene = new Scene();
    this.camera = new PerspectiveCamera(48, containerWidth / containerHeight, 0.1, 1000);
    const globeRadius = 1 * scaleMultiplier;
    const cameraDistance = 2.5 / scaleMultiplier;
    this.camera.position.set(0, 0, cameraDistance);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(containerWidth, containerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = 'srgb';

    const canvas = this.renderer.domElement;
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.cursor = 'grab';
    canvas.style.touchAction = 'none';
    container.appendChild(canvas);

    const oceanRgba = parseColorToRgba(this.oceanColor);
    const outlineRgba = parseColorToRgba(this.outlineColor);
    const graticuleRgba = parseColorToRgba(this.graticuleColor);
    const dotRgba = parseColorToRgba(this.dots.color);
    const fillRgba = parseColorToRgba(this.fillColor);

    // Ocean mesh
    const oceanGeometry = new SphereGeometry(globeRadius * 0.998, 64, 64);
    const oceanColorObj = this.oceanColor ? new Color(this.oceanColor) : new Color(0, 0, 0);
    const oceanMaterial = new MeshBasicMaterial({
      color: oceanColorObj,
      transparent: oceanRgba.a < 1 || oceanRgba.a === 0,
      opacity: oceanRgba.a,
    });
    const oceanMesh = new Mesh(oceanGeometry, oceanMaterial);

    this.globeGroup = new Group();
    const initialLongitudeRad = (this.initialLongitude * Math.PI) / 180;
    const initialLatitudeRad = (this.initialLatitude * Math.PI) / 180;
    this.rotation = { x: initialLongitudeRad, y: initialLatitudeRad };
    this.targetRotation = { x: initialLongitudeRad, y: initialLatitudeRad };
    this.globeGroup.rotation.y = initialLongitudeRad;
    this.globeGroup.rotation.x = initialLatitudeRad;

    this.scene.add(this.globeGroup);
    this.globeGroup.add(oceanMesh);

    // Graticule grid
    if (this.showGrid && this.graticuleColor && graticuleRgba.a > 0) {
      const graticuleGroup = new Group();
      const graticuleColorObj = new Color(this.graticuleColor);
      const graticuleMaterial = new MeshBasicMaterial({
        color: graticuleColorObj,
        transparent: graticuleRgba.a < 1 || graticuleRgba.a === 0,
        opacity: graticuleRgba.a,
      });

      const gridSpacing = 20;
      for (let lat = -80; lat <= 80; lat += gridSpacing) {
        const positions: number[] = [];
        const segments = 64;
        for (let i = 0; i <= segments; i++) {
          const lng = (i / segments) * 360 - 180;
          const pos = latLngToPosition(lat, lng);
          positions.push(pos.x * globeRadius, pos.y * globeRadius, pos.z * globeRadius);
        }
        if (positions.length >= 6) {
          const points: Vector3[] = [];
          for (let i = 0; i < positions.length; i += 3) {
            points.push(new Vector3(positions[i], positions[i + 1], positions[i + 2]));
          }
          if (points.length >= 2) {
            const curve = new CatmullRomCurve3(points);
            const radius = 0.0012;
            const tubeGeometry = new TubeGeometry(curve, points.length * 2, radius, 6, false);
            const tubeMesh = new Mesh(tubeGeometry, graticuleMaterial);
            graticuleGroup.add(tubeMesh);
          }
        }
      }
      for (let lng = -180; lng < 180; lng += gridSpacing) {
        const positions: number[] = [];
        const segments = 64;
        for (let i = 0; i <= segments; i++) {
          const lat = (i / segments) * 160 - 80;
          const pos = latLngToPosition(lat, lng);
          positions.push(pos.x * globeRadius, pos.y * globeRadius, pos.z * globeRadius);
        }
        if (positions.length >= 6) {
          const points: Vector3[] = [];
          for (let i = 0; i < positions.length; i += 3) {
            points.push(new Vector3(positions[i], positions[i + 1], positions[i + 2]));
          }
          if (points.length >= 2) {
            const curve = new CatmullRomCurve3(points);
            const radius = 0.0012;
            const tubeGeometry = new TubeGeometry(curve, points.length * 2, radius, 6, false);
            const tubeMesh = new Mesh(tubeGeometry, graticuleMaterial);
            graticuleGroup.add(tubeMesh);
          }
        }
      }
      this.globeGroup.add(graticuleGroup);
    }

    const continentOutlineGroup = new Group();
    this.globeGroup.add(continentOutlineGroup);

    // Load land data
    this.loadLandGeoJson(
      globeRadius,
      dotSpacing,
      dotSizeMultiplier,
      markerRadiusMultiplier,
      outlineRgba,
      fillRgba,
      dotRgba,
      continentOutlineGroup
    );

    // Event listeners for dragging & touch
    this.setupInteractionListeners(canvas);

    // Resize observer
    this.resizeObserver = new ResizeObserver(() => {
      if (!this.renderer || !this.camera || !container) return;
      const w = container.clientWidth || 500;
      const h = container.clientHeight || 500;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });
    this.resizeObserver.observe(container);

    this.startAnimationLoop();
  }

  private async loadLandGeoJson(
    globeRadius: number,
    dotSpacing: number,
    dotSizeMultiplier: number,
    markerRadiusMultiplier: number,
    outlineRgba: Rgba,
    fillRgba: Rgba,
    dotRgba: Rgba,
    continentOutlineGroup: Group
  ): Promise<void> {
    try {
      this.isLoading.set(true);
      let landFeatures: any;
      try {
        const localRes = await fetch('/data/ne_50m_land.json');
        if (localRes.ok) {
          landFeatures = await localRes.json();
        }
      } catch {
        // Fallback to CDN
      }

      if (!landFeatures) {
        const cdnRes = await fetch(
          'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/50m/physical/ne_50m_land.json'
        );
        if (!cdnRes.ok) throw new Error('Failed to load land data');
        landFeatures = await cdnRes.json();
      }

      if (!this.globeGroup) return;

      // Continent Outlines
      if (this.showOutline && this.outlineColor && outlineRgba.a > 0) {
        const outlineColorObj = new Color(this.outlineColor);
        const outlineMaterial = new MeshBasicMaterial({
          color: outlineColorObj,
          transparent: outlineRgba.a < 1,
          opacity: outlineRgba.a,
          depthTest: true,
          depthWrite: true,
        });

        landFeatures.features.forEach((feature: any) => {
          const featureType =
            feature.properties?.featurecla || feature.properties?.type || '';
          const featureName = feature.properties?.name || '';
          if (
            featureType.toLowerCase().includes('graticule') ||
            featureType.toLowerCase().includes('grid') ||
            featureName.toLowerCase().includes('graticule')
          ) {
            return;
          }
          const geometry = feature.geometry;
          if (!geometry || !geometry.coordinates) return;

          const processRing = (ring: number[][]) => {
            if (ring.length < 2) return;
            const simplifiedRing = simplifyRing(ring, this.detail);
            const positions: number[] = [];
            simplifiedRing.forEach((coord) => {
              const [lng, lat] = coord;
              const pos = latLngToPosition(lat, lng);
              positions.push(pos.x * globeRadius, pos.y * globeRadius, pos.z * globeRadius);
            });
            if (positions.length >= 6) {
              const points: Vector3[] = [];
              for (let i = 0; i < positions.length; i += 3) {
                points.push(new Vector3(positions[i], positions[i + 1], positions[i + 2]));
              }
              if (points.length > 0 && points[0].distanceTo(points[points.length - 1]) > 0.001) {
                points.push(points[0].clone());
              }
              if (points.length >= 2) {
                const curve = new CatmullRomCurve3(points);
                const radius = (this.outlineWidth / 10) * 0.012;
                const tubeGeometry = new TubeGeometry(curve, points.length * 2, radius, 6, false);
                const tubeMesh = new Mesh(tubeGeometry, outlineMaterial);
                tubeMesh.renderOrder = 0;
                continentOutlineGroup.add(tubeMesh);
              }
            }
          };

          if (geometry.type === 'Polygon' && geometry.coordinates.length > 0) {
            processRing(geometry.coordinates[0]);
          } else if (geometry.type === 'MultiPolygon') {
            geometry.coordinates.forEach((polygon: any) => {
              if (polygon.length > 0) processRing(polygon[0]);
            });
          }
        });
      }

      // Raster land sampling for dot grid / solid using standard Equirectangular Canvas projection
      const bitmapWidth = 2048;
      const bitmapHeight = 1024;
      const offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = bitmapWidth;
      offscreenCanvas.height = bitmapHeight;
      const ctx = offscreenCanvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) throw new Error('Canvas 2D context not available');

      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, bitmapWidth, bitmapHeight);
      ctx.fillStyle = '#fff';

      const projectLngLatToCanvas = (lng: number, lat: number): [number, number] => {
        const x = ((lng + 180) / 360) * bitmapWidth;
        const y = ((90 - lat) / 180) * bitmapHeight;
        return [x, y];
      };

      const drawPolygonRing = (ring: number[][]) => {
        if (!ring || ring.length < 2) return;
        const [startX, startY] = projectLngLatToCanvas(ring[0][0], ring[0][1]);
        ctx.moveTo(startX, startY);
        for (let i = 1; i < ring.length; i++) {
          const [px, py] = projectLngLatToCanvas(ring[i][0], ring[i][1]);
          ctx.lineTo(px, py);
        }
      };

      ctx.beginPath();
      landFeatures.features.forEach((feature: any) => {
        const geom = feature.geometry;
        if (!geom || !geom.coordinates) return;
        if (geom.type === 'Polygon') {
          geom.coordinates.forEach((ring: number[][]) => drawPolygonRing(ring));
        } else if (geom.type === 'MultiPolygon') {
          geom.coordinates.forEach((polygon: number[][][]) => {
            polygon.forEach((ring: number[][]) => drawPolygonRing(ring));
          });
        }
      });
      ctx.fill();

      const imageData = ctx.getImageData(0, 0, bitmapWidth, bitmapHeight);
      const pixels = imageData.data;
      const isOnLand = (lng: number, lat: number) => {
        const x = Math.round(((lng + 180) / 360) * bitmapWidth) % bitmapWidth;
        const y = Math.round(((90 - lat) / 180) * bitmapHeight);
        const clampedY = Math.max(0, Math.min(bitmapHeight - 1, y));
        const idx = (clampedY * bitmapWidth + x) * 4;
        return pixels[idx] > 128;
      };

      if (this.fill === 'solid') {
        const texW = 1024;
        const texH = 512;
        const fillCanvas = document.createElement('canvas');
        fillCanvas.width = texW;
        fillCanvas.height = texH;
        const fctx = fillCanvas.getContext('2d')!;
        const img = fctx.createImageData(texW, texH);
        const data = img.data;
        const fr = Math.round(fillRgba.r * 255);
        const fg = Math.round(fillRgba.g * 255);
        const fb = Math.round(fillRgba.b * 255);
        const fa = Math.round((fillRgba.a || 1) * 255);
        for (let ty = 0; ty < texH; ty++) {
          for (let tx = 0; tx < texW; tx++) {
            const u = tx / texW;
            const v = ty / texH;
            let lng = (u - 0.25) * 360;
            lng = ((((lng + 180) % 360) + 360) % 360) - 180;
            const lat = (v - 0.5) * 180;
            const onLand = this.dots.allDots || isOnLand(lng, lat);
            const idx = (ty * texW + tx) * 4;
            if (onLand) {
              data[idx] = fr;
              data[idx + 1] = fg;
              data[idx + 2] = fb;
              data[idx + 3] = fa;
            } else {
              data[idx + 3] = 0;
            }
          }
        }
        fctx.putImageData(img, 0, 0);
        const fillTexture = new CanvasTexture(fillCanvas);
        fillTexture.flipY = false;
        fillTexture.needsUpdate = true;
        const fillGeometry = new SphereGeometry(globeRadius * 1.002, 64, 64);
        const fillMaterial = new MeshBasicMaterial({
          map: fillTexture,
          transparent: true,
        });
        const solidMesh = new Mesh(fillGeometry, fillMaterial);
        this.globeGroup.add(solidMesh);
      } else {
        const dotCoordinates: number[][] = [];
        const baseStep = dotSpacing * 0.08;
        for (let lat = -90; lat <= 90; lat += baseStep) {
          const latRad = (Math.abs(lat) * Math.PI) / 180;
          const cosLat = Math.cos(latRad);
          const lngStep = cosLat > 0.01 ? baseStep / Math.max(0.3, cosLat) : 360;
          for (let lng = -180; lng < 180; lng += lngStep) {
            if (this.dots.allDots || isOnLand(lng, lat)) {
              dotCoordinates.push([lng, lat]);
            }
          }
        }

        if (dotCoordinates.length > 0) {
          const dotGeometry = new SphereGeometry(0.01 * dotSizeMultiplier, 5, 5);
          const dotColorObj = new Color(this.dots.color);
          const dotMaterial = new MeshBasicMaterial({
            color: dotColorObj,
            transparent: dotRgba.a < 1 || dotRgba.a === 0,
            opacity: dotRgba.a,
          });
          const instanced = new InstancedMesh(
            dotGeometry,
            dotMaterial,
            dotCoordinates.length
          );
          const matrix = new Matrix4();
          for (let i = 0; i < dotCoordinates.length; i++) {
            const [lng, lat] = dotCoordinates[i];
            const pos = latLngToPosition(lat, lng);
            matrix.makeScale(1, 1, 1);
            matrix.setPosition(
              pos.x * globeRadius,
              pos.y * globeRadius,
              pos.z * globeRadius
            );
            instanced.setMatrixAt(i, matrix);
          }
          instanced.instanceMatrix.needsUpdate = true;
          this.globeGroup.add(instanced);
        }
      }

      // Add Markers with prominent Gujarat, India Beacon
      if (this.markerConfig.markers && this.markerConfig.markers.length > 0) {
        const markerSize = 0.014 * markerRadiusMultiplier;
        const markerGeometry = new SphereGeometry(markerSize, 16, 16);
        const markerColorObj = new Color(this.markerConfig.color);
        const markerMaterial = new MeshBasicMaterial({
          color: markerColorObj,
        });

        // Gujarat, India Primary HQ Beacon Materials
        const hqCoreMaterial = new MeshBasicMaterial({ color: new Color('#cb5521') });
        const hqHaloMaterial = new MeshBasicMaterial({
          color: new Color('#3d9b4f'),
          transparent: true,
          opacity: 0.5,
        });
        const hqOuterHaloMaterial = new MeshBasicMaterial({
          color: new Color('#ffe95c'),
          transparent: true,
          opacity: 0.3,
        });

        const hqCoreGeom = new SphereGeometry(markerSize * 1.4, 16, 16);
        const hqHaloGeom = new SphereGeometry(markerSize * 2.4, 16, 16);
        const hqOuterHaloGeom = new SphereGeometry(markerSize * 3.6, 16, 16);

        this.markerConfig.markers.forEach((marker, index) => {
          if (typeof marker.lat !== 'number' || typeof marker.lng !== 'number') return;
          const pos = latLngToPosition(marker.lat, marker.lng);
          const isHq = index === 0; // Primary Gujarat, India location

          if (isHq) {
            // Prominent Glowing Multi-layer Beacon for Gujarat, India
            const coreMesh = new Mesh(hqCoreGeom, hqCoreMaterial);
            coreMesh.position.set(
              pos.x * (globeRadius * 1.018),
              pos.y * (globeRadius * 1.018),
              pos.z * (globeRadius * 1.018)
            );
            this.globeGroup?.add(coreMesh);

            const haloMesh = new Mesh(hqHaloGeom, hqHaloMaterial);
            haloMesh.position.set(
              pos.x * (globeRadius * 1.012),
              pos.y * (globeRadius * 1.012),
              pos.z * (globeRadius * 1.012)
            );
            this.globeGroup?.add(haloMesh);

            const outerHaloMesh = new Mesh(hqOuterHaloGeom, hqOuterHaloMaterial);
            outerHaloMesh.position.set(
              pos.x * (globeRadius * 1.006),
              pos.y * (globeRadius * 1.006),
              pos.z * (globeRadius * 1.006)
            );
            this.globeGroup?.add(outerHaloMesh);
          } else {
            const mesh = new Mesh(markerGeometry, markerMaterial);
            mesh.position.set(
              pos.x * (globeRadius * 1.01),
              pos.y * (globeRadius * 1.01),
              pos.z * (globeRadius * 1.01)
            );
            this.globeGroup?.add(mesh);
          }
        });
      }

      this.isLoading.set(false);
    } catch (err: any) {
      console.warn('Could not load vector land data, showing fallback visual', err);
      this.isLoading.set(false);
      this.error.set('Map data unavailable');
    }
  }

  private setupInteractionListeners(canvas: HTMLCanvasElement): void {
    const startDrag = (clientX: number, clientY: number) => {
      this.isDragging = true;
      this.velocity = { x: 0, y: 0 };
      this.lastMouseX = clientX;
      this.lastMouseY = clientY;
      canvas.style.cursor = 'grabbing';
    };

    const handleDrag = (clientX: number, clientY: number) => {
      if (!this.isDragging) return;
      const sensitivity = mapDragSpeedUiToSensitivity(this.dragSpeed);
      const dx = clientX - this.lastMouseX;
      const dy = clientY - this.lastMouseY;
      this.targetRotation.x += dx * sensitivity;
      this.targetRotation.y += dy * sensitivity;
      this.targetRotation.y = Math.max(
        -Math.PI / 2.2,
        Math.min(Math.PI / 2.2, this.targetRotation.y)
      );
      this.velocity.x = dx * sensitivity * 0.35;
      this.velocity.y = dy * sensitivity * 0.35;
      this.lastMouseX = clientX;
      this.lastMouseY = clientY;
    };

    const stopDrag = () => {
      if (this.isDragging) {
        this.isDragging = false;
        canvas.style.cursor = 'grab';
      }
    };

    canvas.addEventListener('mousedown', (e: MouseEvent) => {
      startDrag(e.clientX, e.clientY);
    });

    this.boundOnMouseMove = (e: MouseEvent) => handleDrag(e.clientX, e.clientY);
    this.boundOnMouseUp = () => stopDrag();

    window.addEventListener('mousemove', this.boundOnMouseMove);
    window.addEventListener('mouseup', this.boundOnMouseUp);

    // Touch support
    canvas.addEventListener('touchstart', (e: TouchEvent) => {
      if (e.touches.length > 0) {
        startDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    this.boundOnTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    this.boundOnTouchEnd = () => stopDrag();

    window.addEventListener('touchmove', this.boundOnTouchMove, { passive: true });
    window.addEventListener('touchend', this.boundOnTouchEnd);
  }

  private startAnimationLoop(): void {
    const threshold = 0.001;

    const animate = () => {
      if (!this.globeGroup || !this.renderer || !this.scene || !this.camera) return;

      if (!this.isDragging && this.rotationSpeed !== 0) {
        this.targetRotation.x += this.rotationSpeed * 0.006;
      }

      if (!this.isDragging && this.smoothingN > 0) {
        if (
          Math.abs(this.velocity.x) > threshold ||
          Math.abs(this.velocity.y) > threshold
        ) {
          this.targetRotation.x += this.velocity.x;
          this.targetRotation.y += this.velocity.y;
          this.targetRotation.y = Math.max(
            -Math.PI / 2.2,
            Math.min(Math.PI / 2.2, this.targetRotation.y)
          );
          this.velocity.x *= this.velocityDecay;
          this.velocity.y *= this.velocityDecay;
        } else {
          this.velocity.x = 0;
          this.velocity.y = 0;
        }
      }

      const dx = this.targetRotation.x - this.rotation.x;
      const dy = this.targetRotation.y - this.rotation.y;

      this.rotation.x += dx * this.lerpFactor;
      this.rotation.y += dy * this.lerpFactor;
      this.rotation.y = Math.max(
        -Math.PI / 2.2,
        Math.min(Math.PI / 2.2, this.rotation.y)
      );

      this.globeGroup.rotation.y = this.rotation.x;
      this.globeGroup.rotation.x = this.rotation.y;

      this.renderer.render(this.scene, this.camera);
      this.animationFrameId = requestAnimationFrame(animate);
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  private cleanup(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.boundOnMouseMove) {
      window.removeEventListener('mousemove', this.boundOnMouseMove);
    }
    if (this.boundOnMouseUp) {
      window.removeEventListener('mouseup', this.boundOnMouseUp);
    }
    if (this.boundOnTouchMove) {
      window.removeEventListener('touchmove', this.boundOnTouchMove);
    }
    if (this.boundOnTouchEnd) {
      window.removeEventListener('touchend', this.boundOnTouchEnd);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    if (this.renderer) {
      this.renderer.dispose();
      const canvas = this.renderer.domElement;
      if (canvas && canvas.parentElement) {
        canvas.parentElement.removeChild(canvas);
      }
      this.renderer = null;
    }
    this.scene = null;
    this.camera = null;
    this.globeGroup = null;
  }
}
