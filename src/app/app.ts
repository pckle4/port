import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />',
  styleUrl: './app.css',
})
export class App implements AfterViewInit, OnDestroy {
  private lenis: Lenis | null = null;

  ngAfterViewInit(): void {
    // Initialize Lenis for buttery smooth scrolling
    this.lenis = new Lenis({
      autoRaf: false,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // Sync Lenis scroll updates with GSAP ScrollTrigger
    this.lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis from GSAP's unified ticker (eliminates jitter)
    gsap.ticker.add((time: number) => {
      this.lenis?.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  ngOnDestroy(): void {
    this.lenis?.destroy();
    this.lenis = null;
  }
}
