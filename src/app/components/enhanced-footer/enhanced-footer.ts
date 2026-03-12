import { Component, OnInit, OnDestroy, HostListener, PLATFORM_ID, inject, ChangeDetectionStrategy, signal, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { EnhancedSystemInfoComponent } from '../enhanced-system-info/enhanced-system-info';

@Component({
  selector: 'app-enhanced-footer',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink, EnhancedSystemInfoComponent],
  templateUrl: './enhanced-footer.html',
  styleUrls: ['./enhanced-footer.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnhancedFooterComponent implements OnInit, OnDestroy {
  currentTime = signal(new Date());
  showBackToTop = signal(false);
  private timer: any;
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);

  techStack = [
    { name: "Angular", color: "#DD0031" },
    { name: "TypeScript", color: "#3178C6" },
    { name: "Tailwind", color: "#06B6D4" },
    { name: "Vite", color: "#646CFF" },
  ];

  quickLinks = [
    { name: "Home", route: "/", fragment: undefined as string | undefined },
    { name: "About", route: "/", fragment: "about" },
    { name: "Skills", route: "/", fragment: "skills" },
    { name: "Projects", route: "/", fragment: "projects" },
    { name: "Contact", route: "/", fragment: "contact" },
    { name: "Resume", route: "/resume", fragment: undefined as string | undefined },
  ];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        this.timer = setInterval(() => {
          this.currentTime.set(new Date());
        }, 1000);
      });
    }
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.showBackToTop.set(window.scrollY > 400);
    }
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  formatTime(date: Date) {
    return date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  formatDate(date: Date) {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
}
