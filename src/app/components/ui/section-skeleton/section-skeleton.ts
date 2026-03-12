import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoneComponent } from '../bone/bone';
import { cn } from '../../../lib/utils';

export type SkeletonVariant = 'hero' | 'card-grid' | 'text-block' | 'form';

@Component({
  selector: 'app-section-skeleton',
  standalone: true,
  imports: [CommonModule, BoneComponent],
  templateUrl: './section-skeleton.html',
  styleUrls: ['./section-skeleton.css']
})
export class SectionSkeletonComponent {
  @Input() variant: SkeletonVariant = 'text-block';
  @Input() class: string = '';

  get wrapperClass() {
    return cn('animate-pulse', this.class);
  }
}
