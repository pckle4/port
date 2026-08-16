import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { EnhancedFooterComponent } from '../../components/enhanced-footer/enhanced-footer';
@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [EnhancedFooterComponent],
  templateUrl: './privacy.html',
  styleUrls: ['./privacy.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyComponent {
  protected readonly copied = signal(false);

  copyEmail() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('legal@nowhile.com').then(() => {
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 2000);
      });
    }
  }

  scrollTo(id: string, event: Event): void {
    event.preventDefault();
    if (typeof document !== 'undefined') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
