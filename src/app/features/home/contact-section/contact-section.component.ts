import {
  Component,
  ChangeDetectionStrategy,
  computed,
  inject,
  signal,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectBriefSubmission } from '../../../core/state/brief.selectors';
import { BriefActions } from '../../../core/state/brief.actions';
import { InteractiveGlobeComponent } from '../../../shared/components/interactive-globe/interactive-globe.component';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InteractiveGlobeComponent],
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactSectionComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly store = inject(Store);

  readonly emailCopied = signal(false);
  readonly emailAddress = 'ansh@nowhile.com';

  readonly captchaNum1 = signal<number>(6);
  readonly captchaNum2 = signal<number>(4);
  readonly captchaExpected = computed(() => this.captchaNum1() + this.captchaNum2());

  readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), this.noWhitespaceValidator]],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ],
    ],
    subject: ['', [Validators.required, Validators.minLength(3), this.noWhitespaceValidator]],
    description: ['', [Validators.required, Validators.minLength(10), this.noWhitespaceValidator]],
    captcha: ['', [Validators.required]],
  });

  readonly captchaControlValue = toSignal(this.form.controls.captcha.valueChanges, {
    initialValue: '',
  });

  readonly captchaStatus = computed<'empty' | 'correct' | 'incorrect'>(() => {
    const val = (this.captchaControlValue() || '').trim();
    if (!val) return 'empty';
    const parsed = parseInt(val, 10);
    if (isNaN(parsed)) return 'incorrect';
    return parsed === this.captchaExpected() ? 'correct' : 'incorrect';
  });

  readonly submission = toSignal(this.store.select(selectBriefSubmission), {
    initialValue: { status: 'idle' as const, submittedBrief: null, error: null },
  });

  readonly submitLabel = computed(() =>
    this.submission().status === 'submitting'
      ? 'Sending your message…'
      : 'Send Message'
  );

  ngOnInit(): void {
    this.generateCaptcha();
  }

  generateCaptcha(): void {
    const n1 = Math.floor(Math.random() * 8) + 2; // 2..9
    const n2 = Math.floor(Math.random() * 8) + 1; // 1..8
    this.captchaNum1.set(n1);
    this.captchaNum2.set(n2);
    this.form.controls.captcha.setValue('');
    this.form.controls.captcha.markAsUntouched();
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  private noWhitespaceValidator(control: AbstractControl): { whitespace: boolean } | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  submit(): void {
    if (this.form.invalid || this.captchaStatus() !== 'correct') {
      this.form.markAllAsTouched();
      if (this.captchaStatus() !== 'correct') {
        this.form.controls.captcha.setErrors({ incorrect: true });
      }
      return;
    }

    const raw = this.form.getRawValue();
    this.store.dispatch(
      BriefActions.submitRequested({
        brief: {
          name: raw.name.trim(),
          email: raw.email.trim(),
          subject: raw.subject.trim(),
          description: raw.description.trim(),
        },
      })
    );
  }

  dismissSubmission(): void {
    this.store.dispatch(BriefActions.submissionDismissed());
    this.form.reset();
    this.generateCaptcha();
  }

  copyEmail(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.emailAddress).then(() => {
        this.emailCopied.set(true);
        setTimeout(() => this.emailCopied.set(false), 2200);
      });
    }
  }
}
