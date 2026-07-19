import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild, ElementRef, inject, PLATFORM_ID, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { ThemeService } from '../../services/theme.service';
import { SiteDataService } from '../../services/site-data.service';
import { animate } from 'animejs';

class NavigationStack<T> {
  private items: T[] = [];
  push(item: T) { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
  peek(): T | undefined { return this.items.length > 0 ? this.items[this.items.length - 1] : undefined; }
  isEmpty(): boolean { return this.items.length === 0; }
  clear() { this.items = []; }
}

class TrieNode {
  children: Map<string, TrieNode> = new Map();
  items: Set<ActionItem> = new Set();
}

class ActionTrie {
  root = new TrieNode();

  build(actions: ActionItem[]) {
    this.root = new TrieNode();
    for (const action of actions) {
      this.indexText(action.label, action);
      for (const keyword of action.keywords) {
        this.indexText(keyword, action);
      }
    }
  }

  private indexText(text: string, item: ActionItem) {
    const words = text.toLowerCase().split(/[\s-]+/);
    for (const word of words) {
      if (word.length > 0) {
        for (let i = 0; i < word.length; i++) {
          const suffix = word.substring(i);
          let node = this.root;
          for (const char of suffix) {
            if (!node.children.has(char)) {
              node.children.set(char, new TrieNode());
            }
            node = node.children.get(char)!;
            node.items.add(item);
          }
        }
      }
    }
  }

  search(query: string): ActionItem[] {
    const qWords = query.toLowerCase().trim().split(/[\s-]+/);
    if (qWords.length === 0) return [];
    
    let resultSets: Set<ActionItem>[] = [];
    
    for (const word of qWords) {
      if (word.length === 0) continue;
      let node = this.root;
      let found = true;
      for (const char of word) {
        if (!node.children.has(char)) {
          found = false;
          break;
        }
        node = node.children.get(char)!;
      }
      if (found) {
        resultSets.push(node.items);
      } else {
        return [];
      }
    }
    
    if (resultSets.length === 0) return [];
    
    let finalSet = new Set(resultSets[0]);
    for (let i = 1; i < resultSets.length; i++) {
      const currentSet = resultSets[i];
      for (const item of finalSet) {
        if (!currentSet.has(item)) {
          finalSet.delete(item);
        }
      }
    }
    
    return Array.from(finalSet);
  }
}

export interface ActionItem {
  id: string;
  label: string;
  icon: string;
  keywords: string[];
  perform: () => void;
  type: 'nav' | 'project' | 'social' | 'action' | 'tech';
  shortcut?: string;
  globalIndex?: number;
}

export interface CommandGroup {
  heading: string;
  items: ActionItem[];
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
  @ViewChild('activeIndicator') indicatorRef!: ElementRef<HTMLDivElement>;
  @ViewChild('backdrop') backdropRef!: ElementRef<HTMLDivElement>;
  @ViewChild('dialog') dialogRef!: ElementRef<HTMLDivElement>;

  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private themeService = inject(ThemeService);
  private siteDataService = inject(SiteDataService);
  private cdr = inject(ChangeDetectorRef);

  query = '';
  selectedIndex = 0;
  filteredItems: ActionItem[] = [];
  filteredGroups: CommandGroup[] = [];

  private historyStack = new NavigationStack<{ query: string, items: ActionItem[] }>();
  private searchTrie = new ActionTrie();
  private keyHandler = (e: KeyboardEvent) => this.handleKeyDown(e);

  actions: ActionItem[] = [];

  ngOnInit() {
    this.actions = [
      { id: 'home', label: 'Home', icon: 'home', keywords: ['start', 'index', 'landing', 'main'], perform: () => this.router.navigate(['/']), type: 'nav', shortcut: 'H' },
      { id: 'about', label: 'About', icon: 'user', keywords: ['bio', 'profile', 'information', 'me', 'who'], perform: () => this.navigateToHash('about'), type: 'nav' },
      { id: 'skills', label: 'Skills & Technologies', icon: 'terminal', keywords: ['tech', 'stack', 'languages', 'tools'], perform: () => this.navigateToHash('skills'), type: 'nav' },
      { id: 'projects', label: 'Projects', icon: 'briefcase', keywords: ['work', 'case', 'app', 'demo', 'portfolio'], perform: () => this.navigateToHash('projects'), type: 'nav', shortcut: 'P' },
      { id: 'contact', label: 'Contact', icon: 'mail', keywords: ['email', 'message', 'hire', 'reach'], perform: () => this.navigateToHash('contact'), type: 'nav', shortcut: 'C' },
      { id: 'resume', label: 'View Resume', icon: 'file-text', keywords: ['cv', 'view', 'read', 'job', 'pdf'], perform: () => this.router.navigate(['/resume']), type: 'nav', shortcut: 'R' },
      
      { id: 'tech-react', label: 'React', icon: 'code', keywords: ['reactjs', 'frontend', 'ui', 'component'], perform: () => this.navigateToHash('skills'), type: 'tech' },
      { id: 'tech-typescript', label: 'TypeScript', icon: 'code', keywords: ['ts', 'types', 'javascript'], perform: () => this.navigateToHash('skills'), type: 'tech' },
      { id: 'tech-angular', label: 'Angular', icon: 'code', keywords: ['angular', 'framework', 'frontend', 'components'], perform: () => this.navigateToHash('skills'), type: 'tech' },
      
      { id: 'project-resume', label: 'Resume Generator', icon: 'layout', keywords: ['resume', 'builder', 'generator', 'project'], perform: () => this.openExternal('https://resume.nowhile.com'), type: 'project' },
      { id: 'project-link', label: 'Link File Sharing', icon: 'external-link', keywords: ['url', 'link', 'file', 'sharing', 'frontend', 'react', 'project'], perform: () => this.openExternal('https://l.nowhile.com'), type: 'project' },
      { id: 'project-file', label: 'P2P File Transfer', icon: 'external-link', keywords: ['p2p', 'file', 'transfer', 'sharing', 'project'], perform: () => this.openExternal('https://file.nowhile.com'), type: 'project' },
      
      { id: 'social-github', label: 'GitHub', icon: 'github', keywords: ['git', 'code', 'repo'], perform: () => this.openExternal('https://github.com/theanshshah'), type: 'social' },
      { id: 'social-linkedin', label: 'LinkedIn', icon: 'linkedin', keywords: ['linkedin', 'job', 'career'], perform: () => this.openExternal('https://linkedin.com/in/anshshahh'), type: 'social' },
      
      { id: 'theme-light', label: 'Light Mode', icon: 'sun', keywords: ['light', 'white', 'day', 'theme', 'mode'], perform: () => this.themeService.setTheme('light'), type: 'action' },
      { id: 'theme-dark', label: 'Dark Mode', icon: 'moon', keywords: ['dark', 'black', 'night', 'theme', 'mode'], perform: () => this.themeService.setTheme('dark'), type: 'action' },
      { id: 'privacy', label: 'Privacy Policy', icon: 'shield', keywords: ['privacy', 'policy', 'data', 'legal'], perform: () => this.router.navigate(['/privacy']), type: 'nav' },
      { id: 'terms', label: 'Terms of Service', icon: 'file-text', keywords: ['terms', 'service', 'conditions', 'legal'], perform: () => this.router.navigate(['/terms']), type: 'nav' }
    ];

    this.searchTrie.build(this.actions);

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
    this.filterItems(); 
    
    setTimeout(() => {
      this.inputRef?.nativeElement?.focus();
      this.playEntranceAnimation();
      this.updateActiveIndicator(true);
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
        // Mimicking Framer spring: type: "spring", stiffness: 320, damping: 32, mass: 0.9
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
    this.filterItems();
    this.cdr.markForCheck();
    this.updateActiveIndicator(true);
  }

  clearQuery() {
    if (this.query.trim().length > 0) {
      this.historyStack.push({ query: this.query, items: [...this.filteredItems] });
    }
    this.query = '';
    this.filterItems();
    this.selectedIndex = 0;
    this.cdr.markForCheck();
    this.updateActiveIndicator(true);
  }

  private getGroupHeading(type: string): string {
    switch (type) {
      case 'nav': return 'Navigation';
      case 'project': return 'Projects';
      case 'tech': return 'Technologies';
      case 'social': return 'Social';
      case 'action': return 'Actions';
      default: return 'General';
    }
  }

  filterItems() {
    const q = this.query.toLowerCase().trim();
    let sorted: ActionItem[] = [];

    if (!q) { 
      sorted = [...this.actions];
    } else {
      const matchedItems = this.searchTrie.search(q);
      const queryChars = q.split('');
      const scored = matchedItems.map(item => {
        let score = 0;
        const label = item.label.toLowerCase();
        
        if (label === q) score += 100;
        else if (label.startsWith(q)) score += 80;
        else if (label.includes(q)) score += 60;
        
        let charIdx = 0;
        let fuzzyMatchCount = 0;
        let lastMatchIdx = -1;
        let sequentialMatches = 0;
        
        for (let i = 0; i < label.length && charIdx < queryChars.length; i++) {
          if (label[i] === queryChars[charIdx]) {
            fuzzyMatchCount++;
            if (lastMatchIdx === i - 1) sequentialMatches++;
            lastMatchIdx = i;
            charIdx++;
          }
        }
        
        if (fuzzyMatchCount === queryChars.length) {
           score += 40 + (sequentialMatches * 5); 
        }
        
        item.keywords.forEach(k => {
           if (k === q) score += 70;
           else if (k.startsWith(q)) score += 50;
           else if (k.includes(q)) score += 30;
        });

        return { item, score };
      });

      sorted = scored.filter(s => s.score > 0).sort((a, b) => b.score - a.score).map(s => s.item);
    }

    const grouped = new Map<string, ActionItem[]>();
    let globalIndex = 0;
    
    for (const item of sorted) {
      item.globalIndex = globalIndex++;
      const heading = this.getGroupHeading(item.type);
      if (!grouped.has(heading)) grouped.set(heading, []);
      grouped.get(heading)!.push(item);
    }

    this.filteredGroups = Array.from(grouped.entries()).map(([heading, items]) => ({ heading, items }));
    this.filteredItems = sorted;
  }

  private updateActiveIndicator(immediate = false) {
    if (!isPlatformBrowser(this.platformId) || !this.listRef || !this.indicatorRef) return;
    
    setTimeout(() => {
      const el = this.listRef.nativeElement.querySelector(`[data-index="${this.selectedIndex}"]`) as HTMLElement;
      if (!el) {
        if (this.indicatorRef.nativeElement) this.indicatorRef.nativeElement.style.opacity = '0';
        return;
      }
      
      const top = el.offsetTop;
      const height = el.offsetHeight;
      
      if (immediate) {
        this.indicatorRef.nativeElement.style.top = `${top}px`;
        this.indicatorRef.nativeElement.style.height = `${height}px`;
        this.indicatorRef.nativeElement.style.opacity = '1';
      } else {
        this.indicatorRef.nativeElement.style.opacity = '1';
        animate(this.indicatorRef.nativeElement, {
          top: `${top}px`,
          height: `${height}px`,
          duration: 350,
          ease: 'spring(1, 80, 14, 0)'
        });
      }
    });
  }

  private closeSpotlight() {
    this.playExitAnimation(() => {
      this.query = '';
      this.filteredItems = [];
      this.filteredGroups = [];
      this.selectedIndex = 0;
      this.historyStack.clear();
      this.close.emit();
      this.cdr.markForCheck();
    });
  }

  selectItem(item: ActionItem) {
    try {
      item.perform();
    } finally {
      this.closeSpotlight();
    }
  }

  hoverItem(index: number) {
    if (this.selectedIndex !== index) {
      this.selectedIndex = index;
      this.cdr.markForCheck();
      this.updateActiveIndicator(false);
    }
  }

  onBackdropClick() {
    this.closeSpotlight();
  }

  private handleKeyDown(e: KeyboardEvent) {
    const len = this.filteredItems.length;
    if (e.key === 'ArrowDown' && len > 0) {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex + 1) % len;
      this.scrollToSelected();
      this.updateActiveIndicator(false);
      this.cdr.markForCheck();
    } else if (e.key === 'Backspace' && this.query === '') {
      if (!this.historyStack.isEmpty()) {
        const prevState = this.historyStack.pop()!;
        this.query = prevState.query;
        this.filteredItems = prevState.items;
        // Group them
        const grouped = new Map<string, ActionItem[]>();
        for (const item of this.filteredItems) {
          const heading = this.getGroupHeading(item.type);
          if (!grouped.has(heading)) grouped.set(heading, []);
          grouped.get(heading)!.push(item);
        }
        this.filteredGroups = Array.from(grouped.entries()).map(([heading, items]) => ({ heading, items }));
        
        this.selectedIndex = 0;
        this.cdr.markForCheck();
        this.updateActiveIndicator(true);
      }
    } else if (e.key === 'ArrowUp' && len > 0) {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex - 1 + len) % len;
      this.scrollToSelected();
      this.updateActiveIndicator(false);
      this.cdr.markForCheck();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (len > 0 && this.selectedIndex >= 0 && this.selectedIndex < len) {
        const item = this.filteredItems[this.selectedIndex];
        if (item) {
          this.selectItem(item);
        }
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this.closeSpotlight();
    } else if (e.key === 'Tab') {
      e.preventDefault();
    } else if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault(); e.stopPropagation();
      this.closeSpotlight();
    }
  }

  private scrollToSelected() {
    setTimeout(() => {
      const el = this.listRef?.nativeElement?.querySelector(`[data-index="${this.selectedIndex}"]`) as HTMLElement;
      if (el) {
        el.scrollIntoView({ block: 'nearest' });
      }
    });
  }
}
