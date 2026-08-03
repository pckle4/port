import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectBriefSubmission } from '../../core/state/brief.selectors';
import { BriefActions } from '../../core/state/brief.actions';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { AboutSectionComponent } from '../home/about-section/about-section.component';
import { PortfolioHeroComponent } from '../home/portfolio-hero/portfolio-hero.component';
import { ProjectsSectionComponent } from '../home/projects-section/projects-section.component';
import { SkillsSectionComponent } from '../home/skills-section/skills-section.component';
import { ContactSectionComponent } from '../home/contact-section/contact-section.component';
import { PortfolioFooterComponent } from '../home/portfolio-footer/portfolio-footer.component';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { WorkflowSectionComponent } from '../home/workflow-section/workflow-section.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AboutSectionComponent,
    PortfolioHeroComponent,
    ProjectsSectionComponent,
    SkillsSectionComponent,
    ContactSectionComponent,
    PortfolioFooterComponent,
    SiteHeaderComponent,
    RevealDirective,
    WorkflowSectionComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly store = inject(Store);

  protected readonly menuOpen = signal(false);
  protected readonly activeFaq = signal<number | null>(null);
  protected readonly submission = toSignal(this.store.select(selectBriefSubmission), {
    initialValue: { status: 'idle' as const, submittedBrief: null, error: null },
  });
  protected readonly submitLabel = computed(() =>
    this.submission().status === 'submitting' ? 'Sending your note…' : 'Get a clear brief',
  );

  protected readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    studio: ['', [Validators.required, Validators.minLength(2)]],
  });

 

  protected scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.menuOpen.set(false);
  }

  protected toggleFaq(index: number): void {
    this.activeFaq.update((active) => (active === index ? null : index));
  }

  protected dismissSubmission(): void {
    this.store.dispatch(BriefActions.submissionDismissed());
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.store.dispatch(BriefActions.submitRequested({ brief: this.form.getRawValue() }));
  }
}
