import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EnhancedHeaderComponent } from '../../components/enhanced-header/enhanced-header';
import { EnhancedFooterComponent } from '../../components/enhanced-footer/enhanced-footer';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, RouterLink, EnhancedHeaderComponent, EnhancedFooterComponent, LucideAngularModule],
  templateUrl: './terms.html',
  styleUrls: ['./terms.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsComponent {
  lastUpdated = 'April 19, 2026';
}
