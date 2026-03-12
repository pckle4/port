import { Component, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './not-found.html',
  styleUrls: ['./not-found.css']
})
export class NotFoundComponent implements OnInit, OnDestroy {
  currentTime = new Date();
  fullUrl = '';
  private timer: any;
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.fullUrl = `${window.location.hostname}${window.location.pathname}`;
      this.timer = setInterval(() => {
        this.currentTime = new Date();
      }, 1000);
    }
  }

  formatIST(date: Date): string {
    return date.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  }

  reload() {
    if (isPlatformBrowser(this.platformId)) {
      window.location.reload();
    }
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }
}
