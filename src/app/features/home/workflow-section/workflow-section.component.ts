import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-workflow-section',
  standalone: true,
  templateUrl: './workflow-section.component.html',
  styleUrl: './workflow-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowSectionComponent {
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
}
