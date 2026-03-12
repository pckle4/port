import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mobile-nav-menu',
  standalone: true,
  templateUrl: './mobile-nav-menu.html',
  styleUrls: ['./mobile-nav-menu.css']
})
export class MobileNavMenuComponent {
  @Input() isOpen = false;
  @Output() closeMenu = new EventEmitter<void>();
}
