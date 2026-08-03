import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mobile-nav-toggle',
  standalone: true,
  templateUrl: './mobile-nav-toggle.html',
  styleUrls: ['./mobile-nav-toggle.css']
})
export class MobileNavToggleComponent {
  @Input() isOpen = false;
  @Output() toggle = new EventEmitter<void>();
}
