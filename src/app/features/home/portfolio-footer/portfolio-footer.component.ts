import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { DatePipe } from '@angular/common';

import { RouterLink } from '@angular/router';

interface NetworkInfo {
  ip: string;
  provider: string;
  loading: boolean;
}

@Component({
  selector: 'app-portfolio-footer',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './portfolio-footer.component.html',
  styleUrl: './portfolio-footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioFooterComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  // Live timestamp
  protected readonly currentTime = signal<Date>(new Date());
  protected readonly timeZone = signal<string>('IST');

  // Dynamic Real-time Network Info
  protected readonly networkInfo = signal<NetworkInfo>({
    ip: 'Detecting IP...',
    provider: 'Resolving ISP...',
    loading: true,
  });

  protected readonly isIpHidden = signal<boolean>(false);
  protected readonly copied = signal<boolean>(false);

  ngOnInit(): void {
    this.startLiveClock();
    this.fetchRealNetworkIdentity();
  }

  protected toggleIpVisibility(): void {
    this.isIpHidden.update((hidden) => !hidden);
  }

  protected async copyIp(): Promise<void> {
    const ip = this.networkInfo().ip;
    if (!ip || ip.includes('Detecting')) return;

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(ip);
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 2000);
      }
    } catch {
      // Fallback ignore
    }
  }

  protected scrollTo(id: string): void {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private startLiveClock(): void {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz) {
        this.timeZone.set(
          tz.includes('Calcutta') || tz.includes('Kolkata')
            ? 'IST'
            : tz.split('/').pop() || 'UTC'
        );
      }
    } catch {
      this.timeZone.set('IST');
    }

    const timer = setInterval(() => {
      this.currentTime.set(new Date());
    }, 1000);

    this.destroyRef.onDestroy(() => clearInterval(timer));
  }

  private async fetchRealNetworkIdentity(): Promise<void> {
    // Primary: ipapi.co (Live real public IP & ISP)
    try {
      const res = await fetch('https://ipapi.co/json/', {
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.ip && !data.error) {
          const provider = data.org || data.asn || 'Broadband ISP';
          this.networkInfo.set({
            ip: data.ip,
            provider,
            loading: false,
          });
          return;
        }
      }
    } catch {
      // Fallback to secondary provider if ipapi.co hits rate-limits or CORS in specific regions
    }

    // Secondary fallback: ipwho.is
    try {
      const res = await fetch('https://ipwho.is/');
      if (res.ok) {
        const data = await res.json();
        if (data && data.ip && data.success !== false) {
          const provider =
            data.connection?.isp ||
            data.connection?.org ||
            data.connection?.asn_org ||
            'Broadband ISP';
          this.networkInfo.set({
            ip: data.ip,
            provider,
            loading: false,
          });
          return;
        }
      }
    } catch {
      // Tertiary fallback: api64.ipify.org
      try {
        const res = await fetch('https://api64.ipify.org?format=json');
        if (res.ok) {
          const data = await res.json();
          if (data && data.ip) {
            this.networkInfo.set({
              ip: data.ip,
              provider: 'Public ISP Connection',
              loading: false,
            });
            return;
          }
        }
      } catch {
        this.networkInfo.update((curr) => ({ ...curr, loading: false }));
      }
    }
  }
}
