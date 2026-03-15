import { Component, OnInit, OnDestroy, ElementRef, PLATFORM_ID, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { SectionRegistryService } from '../../services/section-registry.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SkillCardComponent } from './skill-card/skill-card';
import { IconCloudComponent } from '../ui/icon-cloud/icon-cloud';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [CommonModule, SkillCardComponent, IconCloudComponent],
  templateUrl: './skills-section.html',
  styleUrls: ['./skills-section.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsSectionComponent implements OnInit, OnDestroy {
  isVisible = signal(false);
  shouldRenderCloud = signal(false);

  slugs = [
    'typescript', 'javascript', 'react', 'nodedotjs', 'postgresql',
    'mongodb', 'tailwindcss', 'docker', 'git', 'github',
    'python', 'html5', 'css3', 'nextdotjs', 'vercel',
    'vite', 'figma', 'apachekafka', 'nginx', 'graphql',
    'redis', 'dotnet', 'kubernetes', 'linux', 'android'
  ];

  private platformId = inject(PLATFORM_ID);
  private el = inject(ElementRef);
  private sectionRegistry = inject(SectionRegistryService);
  private observer?: IntersectionObserver;

  skillCategories = [
    {
      title: 'Frontend Development',
      description: 'Architecting pixel-perfect, responsive user interfaces.',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Three.js', 'Android'],
      icon: '\u{1F3A8}',
    },
    {
      title: 'Backend Architecture',
      description: 'Building scalable, high-performance server-side logic.',
      skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis', 'C#', '.NET'],
      icon: '\u2699\uFE0F',
    },
    {
      title: 'DevOps & Infrastructure',
      description: 'Streamlining deployment and ensuring reliability.',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux'],
      icon: '\u2601\uFE0F',
    },
    {
      title: 'Design & UX Strategy',
      description: 'Crafting intuitive digital experiences that convert.',
      skills: ['Figma', 'UI/UX', 'Prototyping', 'Wireframing'],
      icon: '\u2728',
    },
  ];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.sectionRegistry.register('skills');
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.isVisible.set(true);
            this.shouldRenderCloud.set(true);
          }
        },
        { threshold: 0.2 }
      );
      this.observer.observe(this.el.nativeElement);
    }
  }

  ngOnDestroy() {
    this.sectionRegistry.unregister('skills');
    this.observer?.disconnect();
  }
}
