import { ChangeDetectionStrategy, Component, inject, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SectionRegistryService } from '../../services/section-registry.service';

@Component({
  selector: 'app-workflow-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workflow-section.html',
  styleUrls: ['./workflow-section.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowSectionComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private sectionRegistry = inject(SectionRegistryService);

  cards = [
    {
      badge: '01',
      title: 'Architected\nfor scale and\nperformance.',
      description: 'Building robust, scalable systems\nand optimizing database queries for\nhigh-throughput environments.',
      theme: 'green'
    },
    {
      badge: '02',
      title: 'Bridging the\ngap between\nteams.',
      description: 'Collaborating seamlessly across\nengineering and design to deliver\ncohesive technical solutions.',
      theme: 'purple'
    },
    {
      badge: '03',
      title: 'Precision in\nevery line\nof code.',
      description: 'Writing clean, maintainable code\nwith rigorous testing to prevent\nminor bugs from becoming major issues.',
      theme: 'orange'
    }
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.sectionRegistry.register('workflow');
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.sectionRegistry.unregister('workflow');
    }
  }
}
