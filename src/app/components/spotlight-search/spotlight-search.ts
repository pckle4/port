import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild, ElementRef, inject, PLATFORM_ID, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { ThemeService } from '../../services/theme.service';
import { SectionRegistryService } from '../../services/section-registry.service';
import { cn } from '../../lib/utils';
import { smoothScrollToWithRetry } from '../../lib/utils';

interface ActionItem {
  id: string;
  label: string;
  description: string;
  icon: string;
  keywords: string[];
  perform: () => void;
  type: 'nav' | 'file' | 'project' | 'social' | 'action' | 'tech';
  color: string;
  secondaryAction?: {
    icon: string;
    label: string;
    perform: (e: MouseEvent) => void;
  };
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
  @ViewChild('listContainer') listRef!: ElementRef<HTMLDivElement>;

  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private themeService = inject(ThemeService);
  private sectionRegistry = inject(SectionRegistryService);
  private cdr = inject(ChangeDetectorRef);

  query = '';
  selectedIndex = 0;
  copiedId: string | null = null;
  filteredItems: ActionItem[] = [];
  currentTimeIST: string = '';
  private timeInterval: any;

  private keyHandler = (e: KeyboardEvent) => this.handleKeyDown(e);

  actions: ActionItem[] = [];

  ngOnInit() {
    this.actions = [
      { id: 'home', label: 'Home', description: 'Go back to the landing page', icon: 'home', keywords: ['start', 'index', 'landing', 'main'], perform: () => this.router.navigate(['/']), type: 'nav', color: 'text-[hsl(var(--dusty-lavender))] bg-[hsl(var(--dusty-lavender))]/10 border-[hsl(var(--dusty-lavender))]/20' },
      { id: 'about', label: 'About', description: 'Learn more about my background', icon: 'user', keywords: ['bio', 'profile', 'information', 'me', 'who'], perform: () => this.navigateToHash('about'), type: 'nav', color: 'text-primary bg-primary/10 border-primary/20' },
      { id: 'skills', label: 'Skills & Technologies', description: 'View my technical expertise', icon: 'terminal', keywords: ['tech', 'stack', 'languages', 'tools', 'react', 'node', 'typescript', 'javascript'], perform: () => this.navigateToHash('skills'), type: 'nav', color: 'text-accent bg-accent/10 border-accent/20' },
      { id: 'projects', label: 'Projects', description: 'Browse my portfolio work', icon: 'briefcase', keywords: ['work', 'case', 'app', 'demo', 'portfolio'], perform: () => this.navigateToHash('projects'), type: 'nav', color: 'text-[hsl(var(--light-coral))] bg-[hsl(var(--light-coral))]/10 border-[hsl(var(--light-coral))]/20' },
      { id: 'contact', label: 'Contact', description: 'Get in touch with me', icon: 'mail', keywords: ['email', 'message', 'hire', 'reach'], perform: () => this.navigateToHash('contact'), type: 'nav', color: 'text-primary bg-primary/10 border-primary/20', secondaryAction: { icon: 'copy', label: 'Copy', perform: () => {} } },
      { id: 'resume', label: 'View Resume', description: 'View my professional resume', icon: 'file-text', keywords: ['cv', 'view', 'read', 'job', 'pdf'], perform: () => this.router.navigate(['/resume']), type: 'file', color: 'text-accent bg-accent/10 border-accent/20', secondaryAction: { icon: 'download', label: 'PDF', perform: () => { const link = document.createElement('a'); link.href = '/resume.pdf'; link.download = 'Ansh_Shah_Resume.pdf'; link.click(); } } },
      { id: 'tech-react', label: 'React', description: 'Frontend Library', icon: 'code', keywords: ['reactjs', 'frontend', 'ui', 'component'], perform: () => this.navigateToHash('skills'), type: 'tech', color: 'text-primary/80 bg-primary/80/10 border-primary/80/20' },
      { id: 'tech-typescript', label: 'TypeScript', description: 'Type-safe JavaScript', icon: 'code', keywords: ['ts', 'types', 'javascript'], perform: () => this.navigateToHash('skills'), type: 'tech', color: 'text-[hsl(var(--dusty-lavender))] bg-[hsl(var(--dusty-lavender))]/10 border-[hsl(var(--dusty-lavender))]/20' },
      { id: 'tech-node', label: 'Node.js', description: 'Backend Runtime', icon: 'code', keywords: ['backend', 'javascript', 'server', 'api'], perform: () => this.navigateToHash('skills'), type: 'tech', color: 'text-primary bg-primary/10 border-primary/20' },
      { id: 'project-resume', label: 'Resume Generator', description: 'Project: React & TypeScript resume builder', icon: 'layout', keywords: ['resume', 'builder', 'generator', 'project'], perform: () => this.navigateToHash('project-resume'), type: 'project', color: 'text-primary bg-primary/10 border-primary/20', secondaryAction: { icon: 'globe', label: 'Visit Site', perform: (e) => { e.stopPropagation(); this.openExternal('https://resume.nowhile.com'); } } },
      { id: 'project-link', label: 'Link File Sharing', description: 'Project: Frontend-only React file sharing', icon: 'external-link', keywords: ['url', 'link', 'file', 'sharing', 'frontend', 'react', 'project'], perform: () => this.navigateToHash('project-link-share'), type: 'project', color: 'text-accent bg-accent/10 border-accent/20', secondaryAction: { icon: 'globe', label: 'Visit Site', perform: (e) => { e.stopPropagation(); this.openExternal('https://l.nowhile.com'); } } },
      { id: 'project-file', label: 'P2P File Transfer', description: 'Project: Secure peer-to-peer file sharing', icon: 'external-link', keywords: ['p2p', 'file', 'transfer', 'sharing', 'project'], perform: () => this.navigateToHash('project-p2p'), type: 'project', color: 'text-[hsl(var(--dusty-lavender))] bg-[hsl(var(--dusty-lavender))]/10 border-[hsl(var(--dusty-lavender))]/20', secondaryAction: { icon: 'globe', label: 'Visit Site', perform: (e) => { e.stopPropagation(); this.openExternal('https://file.nowhile.com'); } } },
      { id: 'project-qr', label: 'QR Code Generator', description: 'Project: Versatile QR code creator', icon: 'external-link', keywords: ['qr', 'code', 'generator', 'project'], perform: () => this.navigateToHash('project-qr'), type: 'project', color: 'text-[hsl(var(--light-coral))] bg-[hsl(var(--light-coral))]/10 border-[hsl(var(--light-coral))]/20', secondaryAction: { icon: 'globe', label: 'Visit Site', perform: (e) => { e.stopPropagation(); this.openExternal('https://qr.nowhile.com'); } } },
      { id: 'social-github', label: 'GitHub', description: 'Check out my code', icon: 'github', keywords: ['git', 'code', 'repo'], perform: () => this.openExternal('https://github.com/theanshshah'), type: 'social', color: 'text-gray-500 dark:text-gray-400 bg-gray-500/10 border-gray-500/20' },
      { id: 'social-linkedin', label: 'LinkedIn', description: 'Connect professionally', icon: 'linkedin', keywords: ['linkedin', 'job', 'career'], perform: () => this.openExternal('https://linkedin.com/in/anshshahh'), type: 'social', color: 'text-[hsl(var(--dusty-lavender))] bg-[hsl(var(--dusty-lavender))]/10 border-[hsl(var(--dusty-lavender))]/20' },
      { id: 'theme-light', label: 'Light Mode', description: 'Switch to light theme', icon: 'sun', keywords: ['light', 'white', 'day', 'theme', 'mode'], perform: () => this.themeService.setTheme('light'), type: 'action', color: 'text-[hsl(var(--light-coral))] bg-[hsl(var(--light-coral))]/10 border-[hsl(var(--light-coral))]/20' },
      { id: 'theme-dark', label: 'Dark Mode', description: 'Switch to dark theme', icon: 'moon', keywords: ['dark', 'black', 'night', 'theme', 'mode'], perform: () => this.themeService.setTheme('dark'), type: 'action', color: 'text-primary bg-primary/10 border-primary/20' },
    ];

    if (isPlatformBrowser(this.platformId)) {
      this.updateTime();
      this.timeInterval = setInterval(() => this.updateTime(), 60000);
      
      if (this.isOpen) {
        this.onOpen();
      }
    }
  }

  private updateTime() {
    this.currentTimeIST = new Date().toLocaleTimeString('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }) + ' IST';
    this.cdr.markForCheck();
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('keydown', this.keyHandler);
      document.body.style.overflow = '';
      if (this.timeInterval) clearInterval(this.timeInterval);
    }
  }

  private navigateToHash(id: string) {
    this.sectionRegistry.loadAllSections();
    if (this.router.url === '/' || this.router.url.startsWith('/#')) {
      smoothScrollToWithRetry(id, { maxRetries: 30, retryInterval: 90 });
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
    setTimeout(() => this.inputRef?.nativeElement?.focus(), 50);
  }

  onQueryChange(value: string) {
    this.query = value;
    this.selectedIndex = 0;
    this.filterItems();
    this.cdr.markForCheck();
  }

  clearQuery() {
    this.query = '';
    this.filteredItems = [];
    this.selectedIndex = 0;
    this.cdr.markForCheck();
  }

  filterItems() {
    const q = this.query.toLowerCase().trim();
    if (!q) { this.filteredItems = []; return; }

    const scored = this.actions.map(item => {
      let score = 0;
      const label = item.label.toLowerCase();
      if (label === q) score = 100;
      else if (label.startsWith(q)) score = 80;
      else if (label.includes(q)) score = 60;
      else if (item.keywords.some(k => k.startsWith(q))) score = 40;
      else if (item.keywords.some(k => k.includes(q))) score = 30;
      else if (item.description.toLowerCase().includes(q)) score = 20;
      return { item, score };
    });

    this.filteredItems = scored
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(s => s.item);
  }

  private closeSpotlight() {
    this.query = '';
    this.filteredItems = [];
    this.selectedIndex = 0;
    this.close.emit();
    this.cdr.markForCheck();
  }

  selectItem(item: ActionItem) {
    try {
      item.perform();
    } finally {
      this.closeSpotlight();
    }
  }

  hoverItem(index: number) {
    this.selectedIndex = index;
    this.cdr.markForCheck();
  }

  handleSecondaryAction(item: ActionItem, e: MouseEvent) {
    e.stopPropagation();
    if (item.id === 'contact') {
      this.copyToClipboard('theanshshah@gmail.com', item.id, e);
    } else if (item.secondaryAction) {
      item.secondaryAction.perform(e);
    }
  }

  copyToClipboard(text: string, id: string, e: MouseEvent) {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    this.copiedId = id;
    this.cdr.markForCheck();
    setTimeout(() => {
      this.copiedId = null;
      this.cdr.markForCheck();
    }, 2000);
  }

  onBackdropClick() {
    this.closeSpotlight();
  }

  getItemClass(item: ActionItem, index: number): string {
    return cn(
      'w-full flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer group',
      'transition-all duration-150 ease-out',
      this.selectedIndex === index
        ? 'bg-primary/10 dark:bg-primary/15 shadow-sm'
        : 'hover:bg-white/5'
    );
  }

  getIconWrapperClass(item: ActionItem, index: number): string {
    return cn(
      'p-2 rounded-lg transition-all duration-200 shrink-0 border',
      item.color,
      this.selectedIndex === index && 'scale-110'
    );
  }

  getLabelClass(index: number): string {
    return cn(
      'text-sm font-medium truncate flex items-center gap-2 transition-colors duration-150',
      this.selectedIndex === index ? 'text-foreground' : 'text-muted-foreground'
    );
  }

  getSecondaryButtonClass(item: ActionItem): string {
    return cn(
      'p-1.5 rounded-md transition-all duration-150 flex items-center gap-1.5 ml-2',
      'hover:bg-white/10 border border-transparent hover:border-white/10',
      this.copiedId === item.id ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'
    );
  }

  private handleKeyDown(e: KeyboardEvent) {
    const len = this.filteredItems.length;
    if (e.key === 'ArrowDown' && len > 0) {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex + 1) % len;
      this.scrollToSelected();
    } else if (e.key === 'ArrowUp' && len > 0) {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex - 1 + len) % len;
      this.scrollToSelected();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (len > 0 && this.selectedIndex >= 0 && this.selectedIndex < len) {
        const item = this.filteredItems[this.selectedIndex];
        if (item) {
          try {
            item.perform();
          } finally {
            this.closeSpotlight();
          }
        }
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this.closeSpotlight();
    } else if (e.key === 'Tab') {
      e.preventDefault();
    } else if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault(); e.stopPropagation();
    }
  }

  private scrollToSelected() {
    setTimeout(() => {
      const el = this.listRef?.nativeElement?.children[this.selectedIndex] as HTMLElement;
      el?.scrollIntoView({ block: 'nearest' });
    });
  }
}

