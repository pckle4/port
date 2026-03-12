import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-mobile-nav-toggle',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './mobile-nav-toggle.html',
  styleUrls: ['./mobile-nav-toggle.css']
})
export class MobileNavToggleComponent {
  @Input() isOpen = false;
  @Output() toggle = new EventEmitter<void>();
}
