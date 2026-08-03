import { Component } from '@angular/core';

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  templateUrl: './mobile-nav.html',
  styleUrls: ['./mobile-nav.css'],
  host: {
    'class': 'contents'
  }
})
export class MobileNavComponent { }
