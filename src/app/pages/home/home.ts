import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeroSectionComponent } from '../../components/hero-section/hero-section';
import { AboutSectionComponent } from '../../components/about-section/about-section';
import { SkillsSectionComponent } from '../../components/skills-section/skills-section';
import { ProjectsSectionComponent } from '../../components/projects-section/projects-section';
import { ContactSectionComponent } from '../../components/contact-section/contact-section';
import { VelocityScrollSectionComponent } from '../../components/velocity-scroll-section/velocity-scroll-section';
import { StackSectionDirective } from '../../core/directives/stack-section.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    AboutSectionComponent,
    SkillsSectionComponent,
    ProjectsSectionComponent,
    ContactSectionComponent,
    VelocityScrollSectionComponent,
    StackSectionDirective
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {}
