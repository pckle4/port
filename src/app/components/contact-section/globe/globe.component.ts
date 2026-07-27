import {
  Component, ElementRef, OnInit, OnDestroy, PLATFORM_ID, inject,
  ChangeDetectionStrategy, NgZone, Input
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  Scene, PerspectiveCamera, WebGLRenderer, SphereGeometry,
  MeshBasicMaterial, Color, Mesh, Group, InstancedMesh,
  Matrix4, Raycaster, Vector2, TubeGeometry, CatmullRomCurve3, Vector3
} from 'three';
import { geoEquirectangular, geoPath } from 'd3-geo';

function latLngToPosition(lat: number, lng: number): { x: number; y: number; z: number } {
  const latRad = lat * (Math.PI / 180);
  const lngRad = lng * (Math.PI / 180);
  return {
    x: Math.cos(latRad) * Math.sin(lngRad),
    y: Math.sin(latRad),
    z: Math.cos(latRad) * Math.cos(lngRad)
  };
}

function simplifyRing(ring: number[][], detail: number): number[][] {
  if (ring.length < 2 || detail >= 10) return ring;
  const stepSize = Math.max(1, Math.floor(10 - detail));
  const simplified: number[][] = [ring[0]];
  for (let i = stepSize; i < ring.length - 1; i += stepSize) {
    simplified.push(ring[Math.min(i, ring.length - 1)]);
  }
  const last = ring[ring.length - 1];
  const first = ring[0];
  if (Math.abs(last[0] - first[0]) > 1e-4 || Math.abs(last[1] - first[1]) > 1e-4) {
    simplified.push(last);
  }
  return simplified.length >= 2 ? simplified : ring;
}

@Component({
  selector: 'app-globe',
  standalone: true,
  template: `<div class="globe-container"></div>`,
  styles: [`
    :host { display: block; width: 100%; height: 100%; }
    .globe-container {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 300px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobeComponent implements OnInit, OnDestroy {
  @Input() speed = 2;
  @Input() dotColor = '#ffffff';
  @Input() dotSize = 5;
  @Input() density = 8;
  @Input() oceanColor = 'transparent';
  @Input() outlineColor = '#ffffff';
  @Input() graticuleColor = 'rgba(255,255,255,0.08)';
  @Input() markerColor = '#a3e635';
  @Input() markers: { lat: number; lng: number }[] = [];
  @Input() markerSize = 40;
  @Input() scaleVal = 8;
  @Input() detail = 5;

  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);

  private renderer?: WebGLRenderer;
  private animationFrameId: number | null = null;
  private resizeObserver?: ResizeObserver;
  private cleanupFns: (() => void)[] = [];

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => this.initGlobe(), 50);
    });
  }

  private async initGlobe() {
    const container = this.el.nativeElement.querySelector('.globe-container') as HTMLElement;
    if (!container) return;

    const w = container.clientWidth || 400;
    const h = container.clientHeight || 400;

    // Scene setup
    const scene = new Scene();
    const camera = new PerspectiveCamera(50, w / h, 0.1, 1000);
    const scaleMultiplier = this.mapScale(this.scaleVal);
    const globeRadius = 1 * scaleMultiplier;
    const cameraDist = 2.5 / scaleMultiplier;
    camera.position.set(0, 0, cameraDist);
    camera.lookAt(0, 0, 0);

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    this.renderer = renderer;
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = 'srgb';

    const canvas = renderer.domElement;
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.opacity = '0';
    canvas.style.transition = 'opacity 0.6s ease';
    container.appendChild(canvas);

    // Ocean sphere
    const oceanGeo = new SphereGeometry(globeRadius, 64, 64);
    const oceanMat = new MeshBasicMaterial({
      color: new Color(this.oceanColor === 'transparent' ? '#000000' : this.oceanColor),
      transparent: true,
      opacity: this.oceanColor === 'transparent' ? 0 : 0.9
    });
    const oceanMesh = new Mesh(oceanGeo, oceanMat);

    // Globe group
    const globeGroup = new Group();
    const initLngRad = (-23 * Math.PI) / 180;
    const initLatRad = (23 * Math.PI) / 180;
    globeGroup.rotation.y = initLngRad;
    globeGroup.rotation.x = initLatRad;
    scene.add(globeGroup);
    globeGroup.add(oceanMesh);

    // Graticule (grid lines)
    const gratColor = new Color(this.graticuleColor.startsWith('rgba') ? '#D4D4D4' : this.graticuleColor);
    const gratMat = new MeshBasicMaterial({ color: gratColor, transparent: true, opacity: 0.08 });
    const graticuleGroup = new Group();
    const gridSpacing = 15;

    for (let lat = -90; lat <= 90; lat += gridSpacing) {
      const points: Vector3[] = [];
      for (let i = 0; i <= 64; i++) {
        const lng = (i / 64) * 360 - 180;
        const pos = latLngToPosition(lat, lng);
        points.push(new Vector3(pos.x * globeRadius, pos.y * globeRadius, pos.z * globeRadius));
      }
      if (points.length >= 2) {
        const curve = new CatmullRomCurve3(points);
        const tube = new TubeGeometry(curve, points.length * 2, 0.001, 4, false);
        graticuleGroup.add(new Mesh(tube, gratMat));
      }
    }
    for (let lng = -180; lng < 180; lng += gridSpacing) {
      const points: Vector3[] = [];
      for (let i = 0; i <= 64; i++) {
        const lat = (i / 64) * 180 - 90;
        const pos = latLngToPosition(lat, lng);
        points.push(new Vector3(pos.x * globeRadius, pos.y * globeRadius, pos.z * globeRadius));
      }
      if (points.length >= 2) {
        const curve = new CatmullRomCurve3(points);
        const tube = new TubeGeometry(curve, points.length * 2, 0.001, 4, false);
        graticuleGroup.add(new Mesh(tube, gratMat));
      }
    }
    globeGroup.add(graticuleGroup);

    // Continent outlines group
    const outlineGroup = new Group();
    globeGroup.add(outlineGroup);

    // Load land data and create dots + outlines
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/50m/physical/ne_50m_land.json'
      );
      if (!response.ok) throw new Error('Failed to load');
      const landFeatures = await response.json();

      // Outlines
      const outlineMat = new MeshBasicMaterial({
        color: new Color(this.outlineColor),
        transparent: true,
        opacity: 0.5
      });

      const processRing = (ring: number[][]) => {
        if (ring.length < 2) return;
        const simplified = simplifyRing(ring, this.detail);
        const points: Vector3[] = simplified.map(coord => {
          const pos = latLngToPosition(coord[1], coord[0]);
          return new Vector3(pos.x * globeRadius, pos.y * globeRadius, pos.z * globeRadius);
        });
        if (points.length > 0 && points[0].distanceTo(points[points.length - 1]) > 0.001) {
          points.push(points[0].clone());
        }
        if (points.length >= 2) {
          const curve = new CatmullRomCurve3(points);
          const tube = new TubeGeometry(curve, points.length * 2, 0.002, 4, false);
          outlineGroup.add(new Mesh(tube, outlineMat));
        }
      };

      landFeatures.features.forEach((feature: any) => {
        const geo = feature.geometry;
        if (!geo || !geo.coordinates) return;
        if (geo.type === 'Polygon' && geo.coordinates.length > 0) {
          processRing(geo.coordinates[0]);
        } else if (geo.type === 'MultiPolygon') {
          geo.coordinates.forEach((polygon: any) => {
            if (polygon.length > 0) processRing(polygon[0]);
          });
        }
      });

      // Create land bitmap for dot placement
      const bitmapW = 2048, bitmapH = 1024;
      const offCanvas = document.createElement('canvas');
      offCanvas.width = bitmapW;
      offCanvas.height = bitmapH;
      const ctx = offCanvas.getContext('2d', { willReadFrequently: true })!;
      const projection = geoEquirectangular().fitSize([bitmapW, bitmapH], { type: 'Sphere' } as any);
      const pathGen = geoPath().projection(projection).context(ctx);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, bitmapW, bitmapH);
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      landFeatures.features.forEach((f: any) => pathGen(f));
      ctx.fill();
      const imgData = ctx.getImageData(0, 0, bitmapW, bitmapH);
      const pixels = imgData.data;

      const isOnLand = (lng: number, lat: number) => {
        const x = Math.round(((lng + 180) / 360) * bitmapW) % bitmapW;
        const y = Math.max(0, Math.min(bitmapH - 1, Math.round(((90 - lat) / 180) * bitmapH)));
        return pixels[(y * bitmapW + x) * 4] > 128;
      };

      // Dot grid
      const dotSpacing = this.mapDensity(this.density) * 0.08;
      const dotSizeMul = this.mapDotSize(this.dotSize);
      const dotCoords: number[][] = [];
      for (let lat = -90; lat <= 90; lat += dotSpacing) {
        const cosLat = Math.cos((Math.abs(lat) * Math.PI) / 180);
        const lngStep = cosLat > 0.01 ? dotSpacing / Math.max(0.3, cosLat) : 360;
        for (let lng = -180; lng < 180; lng += lngStep) {
          if (isOnLand(lng, lat)) dotCoords.push([lng, lat]);
        }
      }

      if (dotCoords.length > 0) {
        const dotGeo = new SphereGeometry(0.01 * dotSizeMul, 4, 4);
        const dotMat = new MeshBasicMaterial({ color: new Color(this.dotColor), transparent: true, opacity: 0.8 });
        const instanced = new InstancedMesh(dotGeo, dotMat, dotCoords.length);
        const matrix = new Matrix4();
        dotCoords.forEach(([lng, lat], i) => {
          const pos = latLngToPosition(lat, lng);
          matrix.makeScale(1, 1, 1);
          matrix.setPosition(pos.x * globeRadius, pos.y * globeRadius, pos.z * globeRadius);
          instanced.setMatrixAt(i, matrix);
        });
        instanced.instanceMatrix.needsUpdate = true;
        globeGroup.add(instanced);
      }

      // Markers
      if (this.markers.length > 0) {
        const mSize = 0.01 * this.mapMarkerSize(this.markerSize);
        const mGeo = new SphereGeometry(mSize, 16, 16);
        const mMat = new MeshBasicMaterial({ color: new Color(this.markerColor) });
        this.markers.forEach(m => {
          const pos = latLngToPosition(m.lat, m.lng);
          const mesh = new Mesh(mGeo, mMat.clone());
          mesh.position.set(pos.x * globeRadius, pos.y * globeRadius, pos.z * globeRadius);
          globeGroup.add(mesh);
        });
      }

      canvas.style.opacity = '1';
    } catch (err) {
      console.error('[Globe] Failed to load land data:', err);
      canvas.style.opacity = '1'; // Show empty globe anyway
    }

    // Rotation & drag
    const rotation = { x: initLngRad, y: initLatRad };
    const targetRotation = { x: initLngRad, y: initLatRad };
    const velocity = { x: 0, y: 0 };
    let isDragging = false;
    let isHovering = false;
    let lastMouseX = 0, lastMouseY = 0;
    const rotSpeed = -(this.speed / 10) * 0.9 * 0.01;
    const lerpFactor = 0.06;
    const velDecay = 0.94;
    const raycaster = new Raycaster();
    const mouse = new Vector2();

    const animate = () => {
      if (!isDragging && rotSpeed !== 0 && !isHovering) {
        targetRotation.x += rotSpeed;
      }
      if (!isDragging) {
        if (Math.abs(velocity.x) > 0.0001 || Math.abs(velocity.y) > 0.0001) {
          targetRotation.x += velocity.x;
          targetRotation.y += velocity.y;
          targetRotation.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotation.y));
          velocity.x *= velDecay;
          velocity.y *= velDecay;
        }
      }
      rotation.x += (targetRotation.x - rotation.x) * lerpFactor;
      rotation.y += (targetRotation.y - rotation.y) * lerpFactor;
      rotation.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotation.y));
      globeGroup.rotation.y = rotation.x;
      globeGroup.rotation.x = rotation.y;
      renderer.render(scene, camera);
      this.animationFrameId = requestAnimationFrame(animate);
    };
    this.animationFrameId = requestAnimationFrame(animate);

    // Mouse drag
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      velocity.x = 0;
      velocity.y = 0;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      const onMove = (me: MouseEvent) => {
        const sens = 0.005;
        const dx = me.clientX - lastMouseX;
        const dy = me.clientY - lastMouseY;
        targetRotation.x += dx * sens;
        targetRotation.y += dy * sens;
        targetRotation.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotation.y));
        velocity.x = dx * sens * 0.3;
        velocity.y = dy * sens * 0.3;
        lastMouseX = me.clientX;
        lastMouseY = me.clientY;
      };
      const onUp = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        isDragging = false;
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    };
    canvas.addEventListener('mousedown', onMouseDown);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      isHovering = raycaster.intersectObject(oceanMesh).length > 0;
    };
    canvas.addEventListener('mousemove', onMouseMove);

    // Resize
    this.resizeObserver = new ResizeObserver(() => {
      const nw = container.clientWidth || 400;
      const nh = container.clientHeight || 400;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
      camera.position.set(0, 0, 2.5 / scaleMultiplier);
      camera.lookAt(0, 0, 0);
    });
    this.resizeObserver.observe(container);

    this.cleanupFns.push(
      () => canvas.removeEventListener('mousedown', onMouseDown),
      () => canvas.removeEventListener('mousemove', onMouseMove),
      () => { if (container.contains(canvas)) container.removeChild(canvas); }
    );
  }

  private mapScale(ui: number): number {
    return 0.2 + ((Math.max(1, Math.min(20, ui)) - 1) / 19) * 1.8;
  }
  private mapDensity(ui: number): number {
    return 24 - ((Math.max(1, Math.min(10, ui)) - 1) / 9) * 16;
  }
  private mapDotSize(ui: number): number {
    return 0.1 + ((Math.max(1, Math.min(10, ui)) - 1) / 9) * 0.4;
  }
  private mapMarkerSize(ui: number): number {
    return 0.1 + (Math.max(0, Math.min(100, ui)) / 100) * 2.4;
  }

  ngOnDestroy() {
    if (this.animationFrameId !== null) cancelAnimationFrame(this.animationFrameId);
    if (this.resizeObserver) this.resizeObserver.disconnect();
    this.cleanupFns.forEach(fn => fn());
    if (this.renderer) this.renderer.dispose();
  }
}
