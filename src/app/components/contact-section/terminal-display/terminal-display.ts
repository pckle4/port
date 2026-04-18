import { Component, Input, OnInit, OnChanges, SimpleChanges, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

export interface Token { text: string; color: string; isClickable?: boolean; }
export interface LineDef { tokens: Token[]; }

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

    lines: LineDef[] = [
      { tokens: [{ text: '{', color: 'text-[#e06c75]' }] },
      {
        tokens: [
          { text: '  "status"', color: 'text-[#98c379]' },
          { text: ': ', color: 'text-muted-foreground' },
          { text: '"available"', color: 'text-[#e5c07b]' },
          { text: ',', color: 'text-muted-foreground' }
        ]
      },
      {
        tokens: [
          { text: '  "email"', color: 'text-[#98c379]' },
          { text: ': ', color: 'text-muted-foreground' },
          { text: '"ansh@nowhile.com"', color: 'text-[#61afef] cursor-pointer hover:underline decoration-[#61afef]', isClickable: true },
          { text: ',', color: 'text-muted-foreground' }
        ]
      },
      {
        tokens: [
          { text: '  "location"', color: 'text-[#98c379]' },
          { text: ': ', color: 'text-muted-foreground' },
          { text: '"Gujarat, India"', color: 'text-[#e5c07b]' },
          { text: ',', color: 'text-muted-foreground' }
        ]
      },
      {
        tokens: [
          { text: '  "response_time"', color: 'text-[#98c379]' },
          { text: ': ', color: 'text-muted-foreground' },
          { text: '"< 24h"', color: 'text-[#e5c07b]' }
        ]
      },
      { tokens: [{ text: '}', color: 'text-[#e06c75]' }] }
    ];

    renderedLines: { tokens: Token[] }[] = [];

    isTyping = false;
    finishedTyping = false;
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
      if (this.isTyping || this.finishedTyping) return;

      this.showContent = true;
      this.isTyping = true;
      this.renderedLines = [];
      this.cdr.markForCheck();

      setTimeout(() => {
        this.typeLines(0);
      }, 500);
    }

    private typeLines(lineIndex: number) {
      if (lineIndex >= this.lines.length) {
        this.isTyping = false;
        this.finishedTyping = true;
        this.cdr.markForCheck();
        return;
      }

      // Add empty line to rendered buffer
      this.renderedLines.push({ tokens: [] });
      this.typeToken(lineIndex, 0, 0);
    }

    private typeToken(lineIndex: number, tokenIndex: number, charIndex: number) {
      const lineSrc = this.lines[lineIndex];
      if (tokenIndex >= lineSrc.tokens.length) {
        // Finished all tokens in this line
        setTimeout(() => this.typeLines(lineIndex + 1), 100);
        return;
      }

      const tokenSrc = lineSrc.tokens[tokenIndex];
      const renderedLine = this.renderedLines[lineIndex];

      if (charIndex === 0) {
        // init new token in rendered line with same color properties but empty string
        renderedLine.tokens.push({ text: '', color: tokenSrc.color, isClickable: tokenSrc.isClickable });
      }

      const currentToken = renderedLine.tokens[tokenIndex];

      if (charIndex >= tokenSrc.text.length) {
        // Done with this token, move to next
        this.typeToken(lineIndex, tokenIndex + 1, 0);
        return;
      }

      currentToken.text += tokenSrc.text[charIndex];
      this.cdr.markForCheck();

      // Vary typing speed
      const delay = Math.random() * 30 + 10;
      setTimeout(() => this.typeToken(lineIndex, tokenIndex, charIndex + 1), delay);
    }

    handleTerminalClick(token: Token) {
      if (token.isClickable) {
        navigator.clipboard.writeText("ansh@nowhile.com");
        // Optional: Add a toast trigger here
      }
    }
}