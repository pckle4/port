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
  icons = [
    { icon: 'file-json', color: "text-primary/40", top: "18%", left: "10%", delay: "0s", size: "w-6 h-6" },
    { icon: 'database', color: "text-accent/35", top: "55%", left: "88%", delay: "1.5s", size: "w-7 h-7" },
    { icon: 'braces', color: "text-secondary/40", top: "72%", left: "8%", delay: "0.5s", size: "w-5 h-5" },
    { icon: 'terminal', color: "text-muted-foreground/30", top: "15%", left: "78%", delay: "2s", size: "w-6 h-6" },
    { icon: 'git-branch', color: "text-accent/30", top: "40%", left: "5%", delay: "0.8s", size: "w-5 h-5" },
    { icon: 'cpu', color: "text-primary/35", top: "82%", left: "75%", delay: "1.2s", size: "w-6 h-6" },
    { icon: 'globe', color: "text-secondary/30", top: "30%", left: "92%", delay: "2.5s", size: "w-5 h-5" },
    { icon: 'layers', color: "text-primary/25", top: "60%", left: "18%", delay: "3s", size: "w-6 h-6" },
    { icon: 'shield', color: "text-accent/25", top: "85%", left: "45%", delay: "1.8s", size: "w-5 h-5" },
    { icon: 'zap', color: "text-secondary/30", top: "10%", left: "45%", delay: "3.5s", size: "w-4 h-4" },
  ];
}
