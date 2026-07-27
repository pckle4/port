import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild, ElementRef, inject, PLATFORM_ID, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { ThemeService } from '../../services/theme.service';
import { animate } from 'animejs';

export interface ActionItem {
  id: string;
  label: string;
  icon: string;
  keywords: string[];
  perform: () => void;
  description?: string;
}

@Component({
  selector: 'app-spotlight-search',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './spotlight-search.html',
  styleUrls: ['./spotlight-search.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpotlightSearchComponent implements OnInit, OnDestroy {
  private _isOpen = false;
  @Input() 
  set isOpen(value: boolean) {
    this._isOpen = value;
    if (isPlatformBrowser(this.platformId)) {
      if (value) {
        this.onOpen();
      } else {
        window.removeEventListener('keydown', this.keyHandler);
        document.body.style.overflow = '';
      }
    }
  }
  get isOpen() { return this._isOpen; }

  @Output() close = new EventEmitter<void>();

  @ViewChild('searchInput') inputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('backdrop') backdropRef!: ElementRef<HTMLDivElement>;
  @ViewChild('dialog') dialogRef!: ElementRef<HTMLDivElement>;

  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private themeService = inject(ThemeService);

  query = '';
  topMatches: ActionItem[] = [];
  selectedIndex = 0;
  actions: ActionItem[] = [];

  private keyHandler = (e: KeyboardEvent) => this.handleKeyDown(e);

  ngOnInit() {
    this.actions = [
      { id: 'home', label: 'Home', description: 'Go to the landing page', icon: 'home', keywords: ['start', 'index', 'landing', 'main'], perform: () => this.router.navigate(['/']) },
      { id: 'about', label: 'About Me', description: 'Read my story and background', icon: 'user', keywords: ['bio', 'profile', 'information', 'me', 'who'], perform: () => this.navigateToHash('about') },
      { id: 'skills', label: 'Skills & Tech', description: 'See my technical stack', icon: 'terminal', keywords: ['tech', 'stack', 'languages', 'tools'], perform: () => this.navigateToHash('skills') },
      { id: 'projects', label: 'Projects', description: 'View my portfolio of work', icon: 'briefcase', keywords: ['work', 'case', 'app', 'demo', 'portfolio'], perform: () => this.navigateToHash('projects') },
      { id: 'contact', label: 'Contact', description: 'Get in touch with me', icon: 'mail', keywords: ['email', 'message', 'hire', 'reach'], perform: () => this.navigateToHash('contact') },
      { id: 'resume', label: 'Resume', description: 'View my curriculum vitae', icon: 'file-text', keywords: ['cv', 'view', 'read', 'job', 'pdf'], perform: () => this.router.navigate(['/resume']) },
      
      { id: 'theme-light', label: 'Light Mode', description: 'Switch to light appearance', icon: 'sun', keywords: ['light', 'white', 'day', 'theme', 'mode'], perform: () => this.themeService.setTheme('light') },
      { id: 'theme-dark', label: 'Dark Mode', description: 'Switch to dark appearance', icon: 'moon', keywords: ['dark', 'black', 'night', 'theme', 'mode'], perform: () => this.themeService.setTheme('dark') },
      
      { id: 'github', label: 'GitHub', description: 'View my code repositories', icon: 'github', keywords: ['git', 'code', 'repo', 'social'], perform: () => this.openExternal('https://github.com/theanshshah') },
      { id: 'linkedin', label: 'LinkedIn', description: 'Connect with me professionally', icon: 'linkedin', keywords: ['linkedin', 'job', 'career', 'social'], perform: () => this.openExternal('https://linkedin.com/in/anshshahh') },
    ];

    if (isPlatformBrowser(this.platformId)) {
      if (this.isOpen) {
        this.onOpen();
      }
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('keydown', this.keyHandler);
      document.body.style.overflow = '';
    }
  }

  private navigateToHash(id: string) {
    if (this.router.url === '/' || this.router.url.startsWith('/#')) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      this.router.navigate(['/'], { fragment: id });
    }
  }

  private openExternal(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  onOpen() {
    window.addEventListener('keydown', this.keyHandler);
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
      this.inputRef?.nativeElement?.focus();
      this.playEntranceAnimation();
    }, 50);
  }

  private playEntranceAnimation() {
    if (this.backdropRef) {
      animate(this.backdropRef.nativeElement, {
        opacity: [0, 1],
        duration: 300,
        ease: 'outExpo'
      });
    }
    if (this.dialogRef) {
      animate(this.dialogRef.nativeElement, {
        opacity: [0, 1],
        scale: [0.96, 1],
        translateY: [-8, 0],
        filter: ['blur(8px)', 'blur(0px)'],
        duration: 400,
        ease: 'spring(0.9, 80, 10, 0)'
      });
    }
  }

  private playExitAnimation(onComplete: () => void) {
    if (this.backdropRef) {
      animate(this.backdropRef.nativeElement, {
        opacity: [1, 0],
        duration: 200,
        ease: 'inOutQuad'
      });
    }
    if (this.dialogRef) {
      animate(this.dialogRef.nativeElement, {
        opacity: [1, 0],
        scale: [1, 0.97],
        translateY: [0, -6],
        filter: ['blur(0px)', 'blur(6px)'],
        duration: 200,
        ease: 'inOutQuad',
        onComplete: onComplete
      });
    } else {
      onComplete();
    }
  }

  onQueryChange(value: string) {
    this.query = value;
    this.selectedIndex = 0;
    this.updateTopMatches();
    this.cdr.markForCheck();
  }

  private updateTopMatches() {
    const q = this.query.toLowerCase().trim();
    if (!q) {
      this.topMatches = [];
      return;
    }

    const scored = this.actions.map(item => {
      let score = 0;
      const label = item.label.toLowerCase();
      
      if (label === q) score += 100;
      else if (label.startsWith(q)) score += 80;
      else if (label.includes(q)) score += 60;
      
      for (const k of item.keywords) {
        if (k === q) score += 70;
        else if (k.startsWith(q)) score += 50;
        else if (k.includes(q)) score += 30;
      }
      return { item, score };
    });

    this.topMatches = scored
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(s => s.item)
      .slice(0, 5); // Show top 5 matches
  }

  getMatchDescription(match: ActionItem): string {
    return match.description || 'Quick action';
  }

  executeMatch(match: ActionItem) {
    try {
      match.perform();
    } finally {
      this.closeSpotlight();
    }
  }

  setSelectedIndex(index: number) {
    this.selectedIndex = index;
    this.cdr.markForCheck();
  }

  private closeSpotlight() {
    this.playExitAnimation(() => {
      this.query = '';
      this.topMatches = [];
      this.selectedIndex = 0;
      this.close.emit();
      this.cdr.markForCheck();
    });
  }

  onBackdropClick() {
    this.closeSpotlight();
  }

  private handleKeyDown(e: KeyboardEvent) {
    const len = this.topMatches.length;
    if (e.key === 'Escape') {
      e.preventDefault();
      this.closeSpotlight();
    } else if (e.key === 'ArrowDown' && len > 0) {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex + 1) % len;
      this.cdr.markForCheck();
    } else if (e.key === 'ArrowUp' && len > 0) {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex - 1 + len) % len;
      this.cdr.markForCheck();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (len > 0 && this.selectedIndex >= 0 && this.selectedIndex < len) {
        this.executeMatch(this.topMatches[this.selectedIndex]);
      }
    } else if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault(); e.stopPropagation();
      this.closeSpotlight();
    }
  }
}

