import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { GridBackgroundComponent } from '../ui/grid-background/grid-background';
import { FloatingIconsComponent } from '../ui/floating-icons/floating-icons';
import { AnimatedHeadlineComponent } from '../ui/animated-headline/animated-headline';
import { smoothScrollTo } from '../../lib/utils';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule,
    GridBackgroundComponent,
    FloatingIconsComponent,
    AnimatedHeadlineComponent
  ],
  templateUrl: './hero-section.html',
  styleUrls: ['./hero-section.css']
})
export class HeroSectionComponent implements OnInit {
  isDesktop = false;
  private platformId = inject(PLATFORM_ID);

  dynamicWords = ["Full Stack Developer", "UI/UX Designer", "Problem Solver", "Creative Thinker"];

  socials = [
    { icon: 'github', href: "https://github.com/theanshshah", color: "text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-white", label: "GitHub Profile" },
    { icon: 'linkedin', href: "https://linkedin.com/in/anshshahh", color: "text-slate-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300", label: "LinkedIn Profile" },
    { icon: 'mail', href: "mailto:theanshshah@gmail.com", color: "text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300", label: "Send Email" }
  ];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDesktop = window.innerWidth >= 768;
    }
  }

  scrollToProjects() {
    smoothScrollTo('projects');
  }

  scrollToAbout() {
    smoothScrollTo('about');
  }
}
