import { Injectable, signal } from '@angular/core';

/**
 * Tracks which section elements are in the DOM.
 * Used by the header to set up intersection observer after lazy-loaded sections appear.
 */
@Injectable({ providedIn: 'root' })
export class SectionRegistryService {
  private readonly registered = signal<Set<string>>(new Set());
  private listeners = new Set<() => void>();
  
  public forceLoadAllSections = signal(false);

  /** Trigger loading of all deferred sections */
  loadAllSections(): void {
    this.forceLoadAllSections.set(true);
  }

  /** Register a section by id when it mounts (call from ngAfterViewInit). */
  register(id: string): void {
    this.registered.update((set) => {
      const next = new Set(set);
      next.add(id);
      return next;
    });
    this.notifyListeners();
  }

  /** Unregister when section is destroyed. */
  unregister(id: string): void {
    this.registered.update((set) => {
      const next = new Set(set);
      next.delete(id);
      return next;
    });
    this.notifyListeners();
  }

  /** Subscribe to runs when sections register. Returns unsubscribe. */
  onSectionsReady(callback: () => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notifyListeners(): void {
    this.listeners.forEach((cb) => cb());
  }
}
