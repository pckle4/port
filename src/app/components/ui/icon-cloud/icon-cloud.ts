import { Component, ElementRef, OnInit, OnDestroy, PLATFORM_ID, inject, ChangeDetectionStrategy, NgZone, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import { ThemeService } from '../../../services/theme.service';
import { SectionRegistryService } from '../../../services/section-registry.service';
import { SiteDataService } from '../../../services/site-data.service';

// DATA STRUCTURE: Map for O(1) cache lookups
const svgCache = new Map<string, string>();

// DATA STRUCTURE: Queue Node
class SvgQueueNode {
  constructor(public slug: string, public pos: THREE.Vector3, public iconSize: number, public next: SvgQueueNode | null = null) {}
}

// DATA STRUCTURE: Custom Queue for FIFO load balancing
class SvgLoadQueue {
  private head: SvgQueueNode | null = null;
  private tail: SvgQueueNode | null = null;
  private size = 0;

  enqueue(slug: string, pos: THREE.Vector3, iconSize: number) {
    const node = new SvgQueueNode(slug, pos, iconSize);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail!.next = node;
      this.tail = node;
    }
    this.size++;
  }

  dequeue(): SvgQueueNode | null {
    if (!this.head) return null;
    const node = this.head;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    this.size--;
    return node;
  }
  
  isEmpty() { return this.size === 0; }
}

// DATA STRUCTURE: Doubly Linked List Node for Momentum Physics
class DoublyLinkedListNode {
  constructor(public velocity: number, public prev: DoublyLinkedListNode | null = null, public next: DoublyLinkedListNode | null = null) {}
}

// DATA STRUCTURE: Doubly Linked List to track drag momentum with O(1) insertions
class MomentumHistoryList {
  head: DoublyLinkedListNode | null = null;
  tail: DoublyLinkedListNode | null = null;
  size = 0;
  maxSize = 5;

  add(velocity: number) {
    const node = new DoublyLinkedListNode(velocity);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail!.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.size++;
    if (this.size > this.maxSize) {
      this.head = this.head!.next;
      if (this.head) this.head.prev = null;
      this.size--;
    }
  }

  getAverageMomentum() {
    if (this.size === 0) return 0;
    let sum = 0;
    let curr = this.head;
    while (curr) {
      sum += curr.velocity;
      curr = curr.next;
    }
    return sum / this.size;
  }
}

@Component({
  selector: 'app-icon-cloud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon-cloud.html',
  styleUrls: ['./icon-cloud.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'block w-full h-full'
  }
})
export class IconCloudComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cloudContainer') cloudContainer!: ElementRef<HTMLDivElement>;

  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private themeService = inject(ThemeService);
  private sectionRegistry = inject(SectionRegistryService);
  private siteDataService = inject(SiteDataService);

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private globeGroup!: THREE.Group;
  
  private animationFrameId: number | null = null;
  private isDragging = false;
  private previousMousePosition = { x: 0, y: 0 };
  private clock = new THREE.Clock();
  private currentAxis = new THREE.Vector3(0, 1, 0); 
  private currentSpeed = 0.15; 

  // Use Doubly Linked List to track momentum smoothly without array reallocation
  private momentumHistory = new MomentumHistoryList();

  private observer?: IntersectionObserver;
  private resizeObserver?: ResizeObserver;
  private isVisible = false;

  private icons = this.siteDataService.data().cloudIcons;

  ngOnInit() {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const init = () => {
      this.initThreeJS();
      
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
    };

    // Ensure the globe initializes immediately without waiting for a potentially delayed idle callback
    setTimeout(init, 0);
  }

  private initThreeJS() {
    this.ngZone.runOutsideAngular(() => {
      const container = this.cloudContainer.nativeElement;
      const width = container.clientWidth || 500;
      const height = container.clientHeight || 500;
      const baseSize = Math.max(260, Math.min(width, height));
      const globeRadius = Math.max(60, Math.min(baseSize * 0.32, 120));
      const iconSize = Math.max(10, Math.min(baseSize * 0.05, 15));

      this.scene = new THREE.Scene();
      
      this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
      
      // Calculate responsive camera distance based on aspect ratio to prevent clipping on mobile
      const aspect = width / height;
      let cameraDistance = Math.max(255, globeRadius * 2.75);
      if (aspect < 1) {
        cameraDistance /= (aspect * 1.1); // Move camera back for narrow screens
      }
      this.camera.position.z = cameraDistance;

      this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(this.renderer.domElement);

      this.globeGroup = new THREE.Group();
      this.scene.add(this.globeGroup);

      const radius = globeRadius;
      const phi = Math.PI * (3 - Math.sqrt(5));
      
      const positions: THREE.Vector3[] = [];

      // DATA STRUCTURES: Queue & Set for intelligent load balancing
      const loadQueue = new SvgLoadQueue();
      const inFlightRequests = new Set<string>();

      this.icons.forEach((iconSlug, i) => {
        const y = 1 - (i / (this.icons.length - 1)) * 2; 
        const r = Math.sqrt(1 - y * y);
        const theta = phi * i;

        const x = Math.cos(theta) * r;
        const z = Math.sin(theta) * r;
        
        const pos = new THREE.Vector3(x * radius, y * radius, z * radius);
        positions.push(pos);

        loadQueue.enqueue(iconSlug, pos, iconSize);
      });

      // Concurrent fetch mechanism using custom Queue
      const processQueue = () => {
        if (loadQueue.isEmpty()) return;
        
        while (inFlightRequests.size < 6 && !loadQueue.isEmpty()) { // Concurrent load limit 6
          const task = loadQueue.dequeue();
          if (task && !inFlightRequests.has(task.slug)) {
            inFlightRequests.add(task.slug);
            this.loadIconTexture(task.slug).then((texture) => {
              inFlightRequests.delete(task.slug);
              if (texture) {
                const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
                const sprite = new THREE.Sprite(material);
                sprite.position.copy(task.pos);
                sprite.scale.set(task.iconSize, task.iconSize, 1);
                this.globeGroup.add(sprite);
              }
              processQueue(); // Keep processing
            });
          }
        }
      };

      processQueue();
      
      // Create connection lines
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: this.themeService.theme() === 'dark' ? 0xF05622 : 0xF05622, // Match Ember accent
        transparent: true, 
        opacity: 0.05 
      });
      
      const lineGeometry = new THREE.BufferGeometry();
      const points: number[] = [];
      
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

      container.style.touchAction = 'none'; 
      container.addEventListener('pointerdown', this.onPointerDown);
      container.addEventListener('pointermove', this.onPointerMove);
      container.addEventListener('pointerup', this.onPointerUp);
      container.addEventListener('pointerleave', this.onPointerUp);
      container.addEventListener('pointercancel', this.onPointerUp);

      // Use ResizeObserver instead of window resize to catch container layout changes (e.g. from animations)
      this.resizeObserver = new ResizeObserver(() => {
        this.onWindowResize();
      });
      this.resizeObserver.observe(container);
    });
  }

  private async loadIconTexture(slug: string): Promise<THREE.Texture | null> {
    const isDark = this.themeService.theme() === 'dark'; 
                  
    const colorOverrides: Record<string, string> = {
      nextdotjs: isDark ? 'ffffff' : '000000',
      github: isDark ? 'ffffff' : '181717',
      express: isDark ? 'ffffff' : '000000',
      vercel: isDark ? 'ffffff' : '000000',
      openai: isDark ? 'ffffff' : '000000'
    };
                  
    try {
      const customColor = colorOverrides[slug];
      const url = customColor ? `https://cdn.simpleicons.org/${slug}/${customColor}` : `https://cdn.simpleicons.org/${slug}`;
      
      let svgText = '';
      if (svgCache.has(url)) {
        svgText = svgCache.get(url)!;
      } else {
        const response = await fetch(url);
        svgText = await response.text();
        svgCache.set(url, svgText);
      }
      
      if (!svgText.includes('width=')) {
        svgText = svgText.replace('<svg ', '<svg width="256" height="256" ');
      }
      
      const blob = new Blob([svgText], { type: 'image/svg+xml' });
      const blobUrl = URL.createObjectURL(blob);
      
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = 256;
          canvas.height = 256;
          const ctx = canvas.getContext('2d');
          if (ctx) {
             ctx.drawImage(img, 0, 0, 256, 256);
             const texture = new THREE.CanvasTexture(canvas);
             texture.colorSpace = THREE.SRGBColorSpace;
             if (this.renderer) {
               texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
             }
             URL.revokeObjectURL(blobUrl);
             resolve(texture);
          } else {
             URL.revokeObjectURL(blobUrl);
             resolve(null);
          }
        };
        img.onerror = () => {
          URL.revokeObjectURL(blobUrl);
          resolve(null);
        };
        img.src = blobUrl;
      });
    } catch {
      return null;
    }
  }

  private animate() {
    if (!this.isVisible) return;

    this.ngZone.runOutsideAngular(() => {
      this.animationFrameId = requestAnimationFrame(this.animate.bind(this));

      const dt = Math.min(this.clock.getDelta(), 0.1); 

      if (this.isDragging) {
        this.currentSpeed *= Math.exp(-8 * dt);
      } else {
        // Use Linked List to apply physics easing from drag release
        const avgMomentum = this.momentumHistory.getAverageMomentum();
        if (avgMomentum > 0.5) {
          this.currentSpeed += (avgMomentum * 0.05); // Burst of speed on release
          this.momentumHistory.add(0); // Decay momentum history
        }

        this.currentSpeed *= Math.exp(-1.2 * dt);
        
        const idleSpeed = 0.2; 
        if (this.currentSpeed < idleSpeed) {
           this.currentSpeed += (idleSpeed - this.currentSpeed) * dt * 5.0; 
        }
      }
        
      if (this.currentSpeed > 0) {
        const q = new THREE.Quaternion().setFromAxisAngle(this.currentAxis, this.currentSpeed * dt);
        this.globeGroup.quaternion.premultiply(q);
      }

      this.renderer.render(this.scene, this.camera);
    });
  }

  private onPointerDown = (event: PointerEvent) => {
    this.isDragging = true;
    this.currentSpeed = 0; 
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
      const axis = new THREE.Vector3(deltaY, deltaX, 0).normalize();
      this.currentAxis.lerp(axis, 0.8).normalize();
      
      // Add velocity to our doubly linked list
      this.momentumHistory.add(distance);
      
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

    const aspect = width / height;
    this.camera.aspect = aspect;
    
    // Dynamically adjust camera distance on resize to maintain responsiveness
    const baseSize = Math.max(260, Math.min(width, height));
    const globeRadius = Math.max(60, Math.min(baseSize * 0.32, 120));
    let cameraDistance = Math.max(255, globeRadius * 2.75);
    if (aspect < 1) {
      cameraDistance /= (aspect * 1.1);
    }
    this.camera.position.z = cameraDistance;
    
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
    
    this.resizeObserver?.disconnect();
    
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
