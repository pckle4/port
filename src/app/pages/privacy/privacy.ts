import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EnhancedHeaderComponent } from '../../components/enhanced-header/enhanced-header';
import { EnhancedFooterComponent } from '../../components/enhanced-footer/enhanced-footer';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, RouterLink, EnhancedHeaderComponent, EnhancedFooterComponent, LucideAngularModule],
  templateUrl: './privacy.html',
  styleUrls: ['./privacy.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyComponent {
  lastUpdated = 'April 19, 2026';
}
