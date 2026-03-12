import { Component, Input, OnInit, OnChanges, SimpleChanges, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-terminal-display',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './terminal-display.html',
  styleUrls: ['./terminal-display.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TerminalDisplayComponent implements OnInit, OnChanges {
  @Input() isVisible = false;
  showContent = false;
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    if (this.isVisible) {
      this.triggerAnimation();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isVisible'] && changes['isVisible'].currentValue === true && !this.showContent) {
      this.triggerAnimation();
    }
  }

  private triggerAnimation() {
    setTimeout(() => {
      this.showContent = true;
      this.cdr.markForCheck();
    }, 400);
  }

  copyEmail() {
    navigator.clipboard.writeText("ansh@nowhile.com");
  }
}
