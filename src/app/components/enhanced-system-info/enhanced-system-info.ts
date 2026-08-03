import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectionStrategy, ChangeDetectorRef, signal, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

interface SystemInfo {
  ip: string;
  isp: string;
  region: string;
  city: string;
  country: string;
}

@Component({
  selector: 'app-enhanced-system-info',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './enhanced-system-info.html',
  styleUrls: ['./enhanced-system-info.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnhancedSystemInfoComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);

  isRevealed = signal(false);
  systemInfo = signal<SystemInfo | null>(null);
  isLoading = signal(false);
  deviceInfo = signal({ os: 'Unknown', browser: 'Unknown', type: 'Desktop' });

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.detectDevice();
    }
  }

  private detectDevice() {
    const ua = navigator.userAgent;
    let os = 'Unknown OS';
    if (ua.indexOf('Win') !== -1) os = 'Windows';
    if (ua.indexOf('Mac') !== -1) os = 'MacOS';
    if (ua.indexOf('Linux') !== -1) os = 'Linux';
    if (ua.indexOf('Android') !== -1) os = 'Android';
    if (ua.indexOf('like Mac') !== -1) os = 'iOS';

    let browser = 'Unknown Browser';
    if (ua.indexOf('Chrome') !== -1) browser = 'Chrome';
    else if (ua.indexOf('Firefox') !== -1) browser = 'Firefox';
    else if (ua.indexOf('Safari') !== -1) browser = 'Safari';
    else if (ua.indexOf('Edge') !== -1) browser = 'Edge';

    const type = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) ? 'Mobile' : 'Desktop';
    this.deviceInfo.set({ os, browser, type });
  }

  toggleReveal() {
    this.isRevealed.set(!this.isRevealed());
    if (this.isRevealed() && !this.systemInfo()) {
      this.fetchSystemInfo();
    }
  }

  private async fetchSystemInfo() {
    this.isLoading.set(true);
    this.cdr.markForCheck();

    this.ngZone.runOutsideAngular(async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        this.ngZone.run(() => {
          if (data && data.ip && !data.error) {
            this.systemInfo.set({
              ip: data.ip,
              isp: data.org || data.asn || 'Protected ISP',
              region: data.region_code || 'UNK',
              city: data.city || 'Protected City',
              country: data.country_name || 'Protected Location',
            });
          } else {
            this.fetchFallback();
          }
          this.isLoading.set(false);
          this.cdr.markForCheck();
        });
      } catch {
        this.ngZone.run(() => {
          this.fetchFallback();
        });
      }
    });
  }

  private async fetchFallback() {
    try {
      const fallback = await fetch('https://api.ipify.org?format=json');
      const fallbackData = await fallback.json();
      this.systemInfo.set({
        ip: fallbackData.ip || 'Protected IP',
        isp: 'Protected ISP',
        region: 'UNK',
        city: 'Protected Location',
        country: 'Protected Network',
      });
    } catch {
      this.systemInfo.set({
        ip: 'Network Protected',
        isp: 'Private Network',
        region: 'SEC',
        city: 'Local',
        country: 'Local',
      });
    }
    this.isLoading.set(false);
    this.cdr.markForCheck();
  }
}
