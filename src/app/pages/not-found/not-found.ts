import { ChangeDetectionStrategy, Component, signal, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './not-found.html',
  styleUrls: ['./not-found.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  protected fullUrl = signal<string>('/404');
  protected currentTime = signal<Date>(new Date());
  private timerId: any;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.fullUrl.set(window.location.href);
      this.timerId = setInterval(() => {
        this.currentTime.set(new Date());
      }, 1000);
    }
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  protected reload() {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }
}
