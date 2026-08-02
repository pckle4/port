import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { PORTFOLIO_PROJECTS } from '../../../core/models/portfolio-projects.models';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsSectionComponent implements AfterViewInit, OnDestroy {
  protected readonly projects = PORTFOLIO_PROJECTS;

  @ViewChild('projectsWrapper', { static: true }) private readonly wrapper!: ElementRef<HTMLElement>;
  @ViewChild('projectsInner', { static: true }) private readonly inner!: ElementRef<HTMLElement>;
  @ViewChild('cardsViewport', { static: true }) private readonly cardsViewport!: ElementRef<HTMLElement>;
  @ViewChild('counterCurrent', { static: true }) private readonly counterCurrent!: ElementRef<HTMLElement>;
  @ViewChild('progressFill', { static: true }) private readonly progressFill!: ElementRef<HTMLElement>;
  @ViewChildren('projectCard') private readonly cards!: QueryList<ElementRef<HTMLElement>>;

  private scrollTriggerInstance: ScrollTrigger | null = null;

  ngAfterViewInit(): void {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => this.setupScrollAnimation());
    });
  }

  ngOnDestroy(): void {
    this.scrollTriggerInstance?.kill();
    ScrollTrigger.getAll().forEach((st) => {
      if (st.vars.trigger === this.wrapper.nativeElement) {
        st.kill();
      }
    });
  }

  private setupScrollAnimation(): void {
    const cardElements = this.cards.toArray().map((c) => c.nativeElement);
    const totalCards = cardElements.length;
    if (totalCards === 0) return;

    // Initial state: parallax stacking setup
    cardElements.forEach((card, i) => {
      gsap.set(card, {
        yPercent: i === 0 ? 0 : 120, // First card visible, rest pushed down
        scale: 1,
        opacity: 1,
        zIndex: i, // Higher index on top
        transformOrigin: 'top center',
        visibility: 'visible',
        force3D: true,
      });
    });

    const tl = gsap.timeline();
    tl.addLabel('deploy0');

    for (let i = 1; i < totalCards; i++) {
      // Hold phase: keep current card in view for a moment
      tl.to({}, { duration: 0.5 });

      const currentCard = cardElements[i];
      const previousCards = cardElements.slice(0, i);
      const scrollPhase = `scroll${i}`;
      
      tl.addLabel(scrollPhase);

      // The new card slides up
      tl.to(
        currentCard,
        {
          yPercent: 0,
          duration: 1,
          ease: 'none', // scrub handles the smoothing
        },
        scrollPhase
      );

      // The previous cards recede (scale down, push up slightly, darken)
      previousCards.forEach((prevCard, j) => {
        const depth = i - j;
        tl.to(
          prevCard,
          {
            scale: 1 - depth * 0.04,
            yPercent: -(depth * 4),
            opacity: 1 - depth * 0.15,
            duration: 1,
            ease: 'none',
          },
          scrollPhase
        );
      });

      // Add a label when this card is fully deployed so ScrollTrigger can snap to it
      tl.addLabel(`deploy${i}`, "+=0");
    }

    // Compute exact progress points where each card is fully deployed
    const totalDuration = tl.duration();
    const snapPoints = cardElements.map((_, i) => {
      const deployTime = i === 0 ? 0 : i * 1.5; // Each cycle is 1.5s (0.5 hold + 1s slide)
      return deployTime / totalDuration;
    });

    // ScrollTrigger: progressive scrolling
    this.scrollTriggerInstance = ScrollTrigger.create({
      trigger: this.wrapper.nativeElement,
      start: 'top top',
      end: `+=${totalCards * 280}vh`, // Increased scroll distance for more gradual progression
      pin: this.inner.nativeElement,
      scrub: 1.2, // Buttery smooth lag
      animation: tl,
      snap: {
        snapTo: snapPoints, // Only snap to fully deployed card states
        duration: { min: 0.2, max: 0.6 },
        delay: 0.15, // Wait slightly before snapping
        ease: 'power2.inOut',
      },
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Calculate which card is dominant
        const activeTime = progress * tl.duration();
        let activeIndex = 0;
        let minDiff = Infinity;
        for (let i = 0; i < totalCards; i++) {
          const deployTime = i === 0 ? 0 : (i * 1.5 - 0.5); // approximate deployment peak
          const diff = Math.abs(activeTime - deployTime);
          if (diff < minDiff) {
            minDiff = diff;
            activeIndex = i;
          }
        }

        // Update counter
        this.counterCurrent.nativeElement.textContent = (activeIndex + 1)
          .toString()
          .padStart(2, '0');

        // Update progress bar
        this.progressFill.nativeElement.style.width = `${progress * 100}%`;
      },
    });
  }
}
