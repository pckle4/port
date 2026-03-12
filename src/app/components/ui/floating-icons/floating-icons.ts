import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-floating-icons',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './floating-icons.html',
  styleUrls: ['./floating-icons.css']
})
export class FloatingIconsComponent {
  parallaxX = 0;
  parallaxY = 0;

  icons = [
    { icon: 'file-json', color: "text-indigo-400/40", top: "25%", left: "15%", delay: "0s" },
    { icon: 'database', color: "text-amber-400/40", top: "55%", left: "85%", delay: "1.5s" },
    { icon: 'braces', color: "text-teal-400/40", top: "70%", left: "12%", delay: "0.5s" },
    { icon: 'terminal', color: "text-slate-400/40", top: "20%", left: "75%", delay: "2s" },
  ];

  onMouseMove(e: MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    this.parallaxX = (e.clientX - rect.left - rect.width / 2) / 50;
    this.parallaxY = (e.clientY - rect.top - rect.height / 2) / 50;
  }
}
