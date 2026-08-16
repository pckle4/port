import { Component, OnInit, OnDestroy, ElementRef, PLATFORM_ID, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { SectionRegistryService } from '../../services/section-registry.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { IconCloudComponent } from '../ui/icon-cloud/icon-cloud';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [CommonModule, IconCloudComponent],
  templateUrl: './skills-section.html',
  styleUrls: ['./skills-section.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsSectionComponent implements OnInit, OnDestroy {
  isVisible = signal(true);

  private platformId = inject(PLATFORM_ID);
  private sectionRegistry = inject(SectionRegistryService);
  private sanitizer = inject(DomSanitizer);

  private rawCategories = [
    {
      title: 'Frontend Development',
      description: 'Architecting pixel-perfect, responsive user interfaces.',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Three.js', 'Android'],
      icon: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M10,25 C10,20 15,15 20,15 L80,15 C85,15 90,20 90,25 L90,75 C90,80 85,85 80,85 L20,85 C15,85 10,80 10,75 Z"/><path d="M10,35 C30,34 60,36 90,35"/><circle cx="25" cy="25" r="2"/><circle cx="35" cy="25" r="2"/><circle cx="45" cy="25" r="2"/><rect x="25" y="45" width="25" height="25" rx="2"/><path d="M60,50 L80,50 M60,60 L75,60 M60,70 L80,70"/></svg>`,
      theme: 'blue',
      decorations: ['bracket-top-right']
    },
    {
      title: 'Backend Architecture',
      description: 'Building scalable, high-performance server-side logic.',
      skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis', 'C#', '.NET', 'Spring Boot', 'Java'],
      icon: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><rect x="20" y="15" width="60" height="20" rx="4"/><rect x="20" y="38" width="60" height="20" rx="4"/><rect x="20" y="61" width="60" height="20" rx="4"/><circle cx="35" cy="25" r="2"/><circle cx="45" cy="25" r="2"/><circle cx="35" cy="48" r="2"/><circle cx="45" cy="48" r="2"/><circle cx="35" cy="71" r="2"/><circle cx="45" cy="71" r="2"/><path d="M50,81 L50,90"/><path d="M30,90 C45,88 65,92 80,90"/></svg>`,
      theme: 'green',
      decorations: ['scribble-bottom-right']
    },
    {
      title: 'DevOps & Infrastructure',
      description: 'Streamlining deployment and ensuring reliability.',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux'],
      icon: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M30,65 A15,15 0 0,1 30,35 A25,25 0 0,1 75,35 A15,15 0 0,1 75,65"/><path d="M52,40 L52,75 M42,50 L52,40 L62,50"/></svg>`,
      theme: 'purple',
      decorations: []
    },
    {
      title: 'Design & UX Strategy',
      description: 'Crafting intuitive digital experiences that convert.',
      skills: ['Figma', 'UI/UX', 'Prototyping', 'Wireframing'],
      icon: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M50,75 L35,45 L50,20 L65,45 Z M50,20 L50,75 M35,75 L65,75 M35,85 L35,75 L65,75 L65,85 M20,20 Q50,0 80,20 M15,20 A5,5 0 1,1 15.1,20 M85,20 A5,5 0 1,1 85.1,20 M50,20 A5,5 0 1,1 50.1,20 M20,50 A4,4 0 1,1 20.1,50 M80,50 A4,4 0 1,1 80.1,50"/></svg>`,
      theme: 'orange',
      decorations: ['arrow-bottom-left']
    },
    {
      title: 'AI & Machine Learning',
      description: 'Implementing intelligent models, Deep Learning, and LLMs.',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning', 'LLMs', 'Scikit-learn'],
      icon: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M50,90 C35,90 25,80 20,70 C10,65 5,50 15,40 C10,25 25,15 35,15 C40,5 55,5 60,15 C75,15 90,25 85,40 C95,50 90,65 80,70 C75,80 65,90 50,90 Z"/><path d="M50,10 L50,90 M30,40 C40,40 40,50 30,55 M70,40 C60,40 60,50 70,55 M25,65 C35,65 35,75 25,75 M75,65 C65,65 65,75 75,75"/></svg>`,
      theme: 'pink',
      decorations: ['star-top-right']
    }
  ];

  skillCategories = this.rawCategories.map(cat => ({
    ...cat,
    iconSafe: this.sanitizer.bypassSecurityTrustHtml(cat.icon)
  }));

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.sectionRegistry.register('skills');
    }
  }

  ngOnDestroy() {
    this.sectionRegistry.unregister('skills');
  }
}
