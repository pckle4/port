import { ChangeDetectionStrategy, Component, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPageComponent implements OnInit, OnDestroy {
  protected fullUrl = signal<string>('');
  protected currentTime = signal<Date>(new Date());
  private timerId: any;

  ngOnInit() {
    this.fullUrl.set(window.location.href);
    this.timerId = setInterval(() => {
      this.currentTime.set(new Date());
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  protected reload() {
    window.location.reload();
  }
}
