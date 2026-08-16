import {
  Component,
  ChangeDetectionStrategy,
  computed,
  inject,
  signal,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { InteractiveGlobeComponent } from '../../shared/components/interactive-globe/interactive-globe.component';
import { SectionRegistryService } from '../../services/section-registry.service';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InteractiveGlobeComponent],
  templateUrl: './contact-section.html',
  styleUrls: ['./contact-section.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactSectionComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly sectionRegistry = inject(SectionRegistryService);
  private readonly platformId = inject(PLATFORM_ID);

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

  readonly submissionStatus = signal<'idle' | 'submitting' | 'success' | 'error'>('idle');
  readonly submissionError = signal<string | null>(null);
  readonly submittedName = signal<string | null>(null);

  readonly submitLabel = computed(() =>
    this.submissionStatus() === 'submitting'
      ? 'Preparing email...'
      : 'Send Message'
  );

  ngOnInit(): void {
    this.generateCaptcha();
    if (isPlatformBrowser(this.platformId)) {
      this.sectionRegistry.register('contact');
    }
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

    this.submissionStatus.set('submitting');
    this.submissionError.set(null);

    const raw = this.form.getRawValue();
    const name = raw.name.trim();
    const email = raw.email.trim();
    const subject = raw.subject.trim();
    const description = raw.description.trim();

    try {
      const recipient = this.emailAddress;
      const finalSubject = `Portfolio Brief: ${subject} (from ${name})`;
      const body = [
        'Hi Ansh,',
        '',
        description,
        '',
        '---',
        `Name: ${name}`,
        `Email: ${email}`,
        'Sent from: Portfolio Contact Form'
      ].join('\n');

      if (isPlatformBrowser(this.platformId)) {
        window.location.href = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(body)}&reply-to=${encodeURIComponent(email)}`;
      }

      this.submissionStatus.set('success');
      this.submittedName.set(name);
      
    } catch {
      this.submissionStatus.set('error');
      this.submissionError.set('Something went wrong while preparing your message. Please try again.');
    }
  }

  dismissSubmission(): void {
    this.submissionStatus.set('idle');
    this.submittedName.set(null);
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
