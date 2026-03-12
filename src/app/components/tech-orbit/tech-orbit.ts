import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-tech-orbit',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './tech-orbit.html',
  styleUrls: ['./tech-orbit.css']
})
export class TechOrbitComponent { }
