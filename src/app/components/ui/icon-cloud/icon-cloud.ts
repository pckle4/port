import { Component, ElementRef, OnInit, OnDestroy, PLATFORM_ID, inject, ChangeDetectionStrategy, NgZone, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import { ThemeService } from '../../../services/theme.service';
import { SectionRegistryService } from '../../../services/section-registry.service';

@Component({
  selector: 'app-icon-cloud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon-cloud.html',
  styleUrls: ['./icon-cloud.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconCloudComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cloudContainer') cloudContainer!: ElementRef<HTMLDivElement>;

  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private themeService = inject(ThemeService);
  private sectionRegistry = inject(SectionRegistryService);

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private globeGroup!: THREE.Group;
  
  private animationFrameId: number | null = null;
  private isDragging = false;
  private previousMousePosition = { x: 0, y: 0 };
  private clock = new THREE.Clock();
  private currentAxis = new THREE.Vector3(0, 1, 0); // Start with horizontal axis
  private currentSpeed = 0.15; // Base auto-rotation speed (rad/s)

  private observer?: IntersectionObserver;
  private isVisible = false;

  private icons = [
    'typescript', 'javascript', 'react', 'nodedotjs', 'postgresql', 
    'mongodb', 'tailwindcss', 'docker', 'git', 'github', 
    'python', 'html5', 'css3', 'nextdotjs', 'vercel', 
    'vite', 'figma', 'apachekafka', 'nginx', 'graphql', 
    'redis', 'dotnet', 'kubernetes', 'linux', 'android'
  ];

  ngOnInit() {
    // Basic setup
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.initThreeJS();
    
    // Visibility observer to pause/resume animation
    this.observer = new IntersectionObserver((entries) => {
      this.isVisible = entries[0].isIntersecting;
      if (this.isVisible) {
        this.animate();
      } else if (this.animationFrameId !== null) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
    }, { threshold: 0.1 });
    
    this.observer.observe(this.cloudContainer.nativeElement);
  }

  private initThreeJS() {
    this.ngZone.runOutsideAngular(() => {
      const container = this.cloudContainer.nativeElement;
      const width = container.clientWidth || 500;
      const height = container.clientHeight || 500;

      this.scene = new THREE.Scene();
      
      this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
      this.camera.position.z = 280; // Distance increased (zoomed out to fix clipping)

      this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // cap at 2 for performance
      container.appendChild(this.renderer.domElement);

      this.globeGroup = new THREE.Group();
      this.scene.add(this.globeGroup);

      // Distribute icons on a sphere using Fibonacci lattice
      const radius = 90; // Reduced radius so icons don't clip out of bounds
      const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
      
      const positions: THREE.Vector3[] = [];

      this.icons.forEach((iconSlug, i) => {
        const y = 1 - (i / (this.icons.length - 1)) * 2; 
        const r = Math.sqrt(1 - y * y);
        const theta = phi * i;

        const x = Math.cos(theta) * r;
        const z = Math.sin(theta) * r;
        
        const pos = new THREE.Vector3(x * radius, y * radius, z * radius);
        positions.push(pos);

        // Create Sprite
        this.loadIconTexture(iconSlug).then((texture) => {
          if (!texture) return;
          const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
          const sprite = new THREE.Sprite(material);
          sprite.position.copy(pos);
          sprite.scale.set(18, 18, 1); // Reduced icon size
          this.globeGroup.add(sprite);
        });
      });
      
      // Create connection lines
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: this.themeService.theme() === 'dark' ? 0x94e2f0 : 0xa4ccbe, 
        transparent: true, 
        opacity: 0.02 // Ultra low opacity as requested
      });
      
      const lineGeometry = new THREE.BufferGeometry();
      const points: number[] = [];
      
      // Connect each point to its nearest 3 neighbors
      for (let i = 0; i < positions.length; i++) {
        const distances = positions.map((p, j) => ({ index: j, dist: positions[i].distanceTo(p) }));
        distances.sort((a, b) => a.dist - b.dist);
        
        for (let j = 1; j <= 3; j++) {
            points.push(positions[i].x, positions[i].y, positions[i].z);
            points.push(positions[distances[j].index].x, positions[distances[j].index].y, positions[distances[j].index].z);
        }
      }
      
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
      const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
      this.globeGroup.add(lines);

      // Interactive pointer events for drag rotation (Globe interaction)
      container.style.touchAction = 'none'; // Prevent scroll when dragging globe
      container.addEventListener('pointerdown', this.onPointerDown);
      container.addEventListener('pointermove', this.onPointerMove);
      container.addEventListener('pointerup', this.onPointerUp);
      container.addEventListener('pointerleave', this.onPointerUp);
      container.addEventListener('pointercancel', this.onPointerUp);

      // Resize listener
      window.addEventListener('resize', this.onWindowResize);
    });
  }

  private async loadIconTexture(slug: string): Promise<THREE.Texture | null> {
    // The skills section is now permanently dark, so we force dark mode icon colors
    const isDark = true; 
                  
    // Some icons are invisible against dark backgrounds (black on dark grey)
    // We override their color to ensure visibility while mostly using original brand colors
    const colorOverrides: Record<string, string> = {
      nextdotjs: isDark ? 'ffffff' : '000000',
      github: isDark ? 'ffffff' : '181717',
      express: isDark ? 'ffffff' : '000000',
      vercel: isDark ? 'ffffff' : '000000'
    };
                  
    try {
      return new Promise((resolve) => {
        const loader = new THREE.TextureLoader();
        const customColor = colorOverrides[slug];
        // If a custom color is specified, use it. Otherwise omit color param to get original brand color!
        const url = customColor ? `https://cdn.simpleicons.org/${slug}/${customColor}` : `https://cdn.simpleicons.org/${slug}`;
        
        loader.load(url, (texture: THREE.Texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            resolve(texture);
        }, undefined, () => {
            resolve(null);
        });
      });
    } catch {
      return null;
    }
  }

  private animate() {
    if (!this.isVisible) return;

    this.ngZone.runOutsideAngular(() => {
      this.animationFrameId = requestAnimationFrame(this.animate.bind(this));

      // Advanced Physics calculation using Delta Time (ignores framerate drops)
      const dt = Math.min(this.clock.getDelta(), 0.1); 

      if (this.isDragging) {
        // Friction applies while holding to give the globe a buttery 'weight'
        this.currentSpeed *= Math.exp(-8 * dt);
      } else {
        // Natural friction coasting
        this.currentSpeed *= Math.exp(-1.2 * dt);
        
        // Auto-rotation stays purely on the EXACT axis the user left it at!
        // No changing directions.
        const idleSpeed = 0.2; // Smooth rad/s
        if (this.currentSpeed < idleSpeed) {
           this.currentSpeed += (idleSpeed - this.currentSpeed) * dt * 5.0; // Soft minimum speed cap
        }
      }
        
      // Execute momentum rotation flawlessly without gimbal lock
      if (this.currentSpeed > 0) {
        const q = new THREE.Quaternion().setFromAxisAngle(this.currentAxis, this.currentSpeed * dt);
        this.globeGroup.quaternion.premultiply(q);
      }

      this.renderer.render(this.scene, this.camera);
    });
  }

  private onPointerDown = (event: PointerEvent) => {
    // Stop physics immediately when grabbing
    this.isDragging = true;
    this.currentSpeed = 0; 
    
    // Reset clock to avoid huge elapsed time jumps after releasing
    this.clock.getDelta(); 
    
    this.previousMousePosition = { x: event.clientX, y: event.clientY };
    const container = this.cloudContainer.nativeElement;
    if (container.setPointerCapture) {
      container.setPointerCapture(event.pointerId);
    }
  };

  private onPointerMove = (event: PointerEvent) => {
    if (!this.isDragging) return;
    const deltaX = event.clientX - this.previousMousePosition.x;
    const deltaY = event.clientY - this.previousMousePosition.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance > 0) {
      // Rotation axis is perpendicular to drag direction mathematically
      const axis = new THREE.Vector3(deltaY, deltaX, 0).normalize();
      
      // Update momentum direction smoothly
      this.currentAxis.lerp(axis, 0.8).normalize();
      
      // Inject physical momentum rather than snapping rotation.
      // This produces an ultra-smooth, buttery drag feeling like rolling a heavy physical marble.
      this.currentSpeed += distance * 0.15; 
    }
    
    this.previousMousePosition = { x: event.clientX, y: event.clientY };
  };

  private onPointerUp = (event: PointerEvent) => {
    this.isDragging = false;
    const container = this.cloudContainer.nativeElement;
    if (container.hasPointerCapture && container.hasPointerCapture(event.pointerId)) {
      container.releasePointerCapture(event.pointerId);
    }
  };

  private onWindowResize = () => {
    if (!this.cloudContainer) return;
    const container = this.cloudContainer.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    if (width === 0 || height === 0) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  ngOnDestroy() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.observer?.disconnect();
    
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    this.scene?.clear();
    this.renderer?.dispose();
    
    window.removeEventListener('resize', this.onWindowResize);
    
    const container = this.cloudContainer?.nativeElement;
    if (container) {
      container.removeEventListener('pointerdown', this.onPointerDown);
      container.removeEventListener('pointermove', this.onPointerMove);
      container.removeEventListener('pointerup', this.onPointerUp);
      container.removeEventListener('pointerleave', this.onPointerUp);
      container.removeEventListener('pointercancel', this.onPointerUp);
    }
  }
}