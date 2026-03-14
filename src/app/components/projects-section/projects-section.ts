import { Component, ChangeDetectionStrategy, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ProjectCardComponent } from './project-card/project-card';
import { SectionRegistryService } from '../../services/section-registry.service';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ProjectCardComponent],
  templateUrl: './projects-section.html',
  styleUrls: ['./projects-section.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsSectionComponent implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private sectionRegistry = inject(SectionRegistryService);

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.sectionRegistry.register('projects');
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      this.sectionRegistry.unregister('projects');
    }
  }

  projects = [
    {
      id: "project-link-share",
      title: "Link File Sharing",
      description: "A secure, frontend-only file sharing platform. Encrypts files client-side and generates shareable links without permanent server storage.",
      tags: ["React", "Tailwind CSS", "Web Crypto API"],
      image: "/images/4x.png",
      links: { demo: "https://l.nowhile.com", github: "https://github.com/theanshshah" },
      color: "from-orange-500 to-red-500",
      date: "November 2025",
      category: "Web App"
    },
    {
      id: "project-resume",
      title: "Resume Generator",
      description: "Professional resume builder with real-time preview. Features dynamic forms, customizable templates, and instant PDF export.",
      tags: ["React", "TypeScript", "Shadcn UI"],
      image: "/images/1x.png",
      links: { demo: "https://resume.nowhile.com", github: "https://github.com/theanshshah" },
      color: "from-purple-500 to-indigo-500",
      date: "January 2025",
      category: "Productivity"
    },
    {
      id: "project-p2p",
      title: "P2P File Transfer",
      description: "Direct browser-to-browser file sharing using WebRTC. Supports large files and real-time text chat with zero-knowledge privacy.",
      tags: ["Vanilla JS", "WebRTC", "Socket.io"],
      image: "/images/3x.png",
      links: { demo: "https://file.nowhile.com", github: "https://github.com/theanshshah" },
      color: "from-blue-500 to-cyan-500",
      date: "January 2025",
      category: "Networking"
    },
    {
      id: "project-qr",
      title: "QR Code Generator",
      description: "Advanced QR tool supporting URLs, WiFi, vCards, and more. Includes customization options for colors, logos, and error correction levels.",
      tags: ["React", "TypeScript", "Canvas API"],
      image: "/images/2x.png",
      links: { demo: "https://qr.nowhile.com", github: "https://github.com/theanshshah" },
      color: "from-emerald-500 to-green-500",
      date: "March 2025",
      category: "Utility"
    }
  ];
}
