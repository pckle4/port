import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

// Linked List Node Data Structure for O(1) enqueuing/dequeuing
class QueueNode {
  constructor(public fn: () => Observable<any>, public next: QueueNode | null = null) {}
}

@Injectable({ providedIn: 'root' })
export class LinkedListPreloader implements PreloadingStrategy {
  private platformId = inject(PLATFORM_ID);
  
  // LinkedList pointers
  private head: QueueNode | null = null;
  private tail: QueueNode | null = null;
  private isProcessing = false;

  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    // Only preload on the browser to avoid server-side memory leaks
    if (!isPlatformBrowser(this.platformId)) {
      return of(null);
    }

    // Add task to our Custom Linked List Data Structure
    const node = new QueueNode(fn);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      if (this.tail) {
        this.tail.next = node;
      }
      this.tail = node;
    }

    this.processQueue();

    // Return empty observable immediately so Angular router doesn't block
    return of(null);
  }

  private processQueue() {
    if (this.isProcessing || !this.head) {
      return;
    }

    this.isProcessing = true;

    const processNext = () => {
      if (!this.head) {
        this.isProcessing = false;
        return;
      }

      // Pop from Linked List Queue O(1)
      const node = this.head;
      this.head = this.head.next; 
      if (!this.head) {
        this.tail = null;
      }

      // Execute module load
      node.fn().subscribe({
        complete: () => {
          // Schedule next module load in background idle time
          this.scheduleNext(processNext);
        },
        error: () => {
          // Continue even if one fails
          this.scheduleNext(processNext);
        }
      });
    };

    // Delay start slightly to let initial render finish
    setTimeout(() => {
      this.scheduleNext(processNext);
    }, 1000);
  }

  private scheduleNext(fn: () => void) {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      (window as any).requestIdleCallback(fn, { timeout: 2000 });
    } else {
      setTimeout(fn, 100); // Fallback for Safari
    }
  }
}
