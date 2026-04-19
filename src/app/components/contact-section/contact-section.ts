import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  PLATFORM_ID,
  inject,
  ChangeDetectionStrategy,
  signal,
  computed
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { SectionRegistryService } from '../../services/section-registry.service';
import { TerminalDisplayComponent } from './terminal-display/terminal-display';
import { SpinnerComponent } from '../ui/spinner/spinner';

type SubmitStatus = 'idle' | 'success' | 'error';
type CaptchaMode = 'code' | 'math';

interface CaptchaChallenge {
  mode: CaptchaMode;
  prompt: string;
  answer: string;
  hint: string;
}

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    TerminalDisplayComponent,
    SpinnerComponent
  ],
  templateUrl: './contact-section.html',
  styleUrls: ['./contact-section.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactSectionComponent implements OnInit, OnDestroy {
  isVisible = signal(false);
  isSubmitting = signal(false);
  submitStatus = signal<SubmitStatus>('idle');
  formMessage = signal('');
  captchaState = signal<'idle' | 'valid' | 'invalid'>('idle');
  captchaAttempts = signal(0);
  captchaChallenge = signal<CaptchaChallenge>({
    mode: 'code',
    prompt: 'Type the security code exactly as shown',
    answer: 'ABCDE',
    hint: 'Letters and numbers only'
  });
  captchaDisplay = computed(() => this.captchaChallenge().answer.split('').join(' '));

  hp = '';

  private fb = inject(FormBuilder);
  private platformId = inject(PLATFORM_ID);
  private el = inject(ElementRef);
  private sectionRegistry = inject(SectionRegistryService);
  private observer?: IntersectionObserver;
  private captchaSub?: Subscription;

  contactForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    message: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(2000)]],
    captcha: ['', [Validators.required]]
  });

  get f() {
    return this.contactForm.controls;
  }

  ngOnInit() {
    this.generateCaptcha();

    this.captchaSub = this.f.captcha.valueChanges.subscribe((value) => {
      const normalized = this.normalizeCaptcha(value);
      if (!normalized) {
        this.captchaState.set('idle');
        this.clearCaptchaIncorrectError();
        return;
      }

      if (this.isCaptchaAnswerCorrect(value)) {
        this.captchaState.set('valid');
        this.clearCaptchaIncorrectError();
      } else {
        this.captchaState.set('invalid');
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      this.sectionRegistry.register('contact');
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.isVisible.set(true);
          }
        },
        { threshold: 0.1 }
      );
      this.observer.observe(this.el.nativeElement);
    }
  }

  handleSubmit() {
    if (this.hp.trim()) {
      this.submitStatus.set('error');
      this.formMessage.set('Security check failed. Please refresh and try again.');
      return;
    }

    this.contactForm.markAllAsTouched();

    const captchaCorrect = this.isCaptchaAnswerCorrect(this.f.captcha.value);
    if (!captchaCorrect) {
      this.setCaptchaIncorrectError();
      this.captchaState.set('invalid');
      this.captchaAttempts.update((attempts) => attempts + 1);
    }

    if (this.contactForm.invalid || !captchaCorrect) {
      this.submitStatus.set('error');
      this.formMessage.set('Please fix the highlighted fields and complete verification.');

      if (this.captchaAttempts() >= 2) {
        this.refreshCaptcha();
        this.formMessage.set('Captcha refreshed after multiple failed attempts.');
      }

      return;
    }

    this.submitStatus.set('idle');
    this.formMessage.set('');
    this.isSubmitting.set(true);

    try {
      const { name, email, subject, message } = this.contactForm.getRawValue();
      const recipient = 'ansh@nowhile.com';
      const finalSubject = `Portfolio Brief: ${subject} (from ${name})`;
      const body = [
        'Hi Ansh,',
        '',
        message,
        '',
        '---',
        `Name: ${name}`,
        `Email: ${email}`,
        'Sent from: Portfolio Contact Form'
      ].join('\n');

      if (isPlatformBrowser(this.platformId)) {
        window.location.href = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(body)}&reply-to=${encodeURIComponent(email)}`;
      }

      this.submitStatus.set('success');
      this.formMessage.set('Your email draft has been prepared in your default mail app.');

      this.contactForm.reset();
      this.refreshCaptcha();
    } catch {
      this.submitStatus.set('error');
      this.formMessage.set('Something went wrong while preparing your message. Please try again.');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  refreshCaptcha() {
    this.generateCaptcha();
    this.f.captcha.reset('');
    this.f.captcha.markAsPristine();
    this.f.captcha.markAsUntouched();
    this.clearCaptchaIncorrectError();
    this.captchaState.set('idle');
  }

  startNewMessage() {
    this.submitStatus.set('idle');
    this.formMessage.set('');
    this.contactForm.markAsPristine();
    this.contactForm.markAsUntouched();
  }

  private generateCaptcha() {
    const useCodeMode = Math.random() > 0.4;

    if (useCodeMode) {
      const code = this.createCaptchaCode(5);
      this.captchaChallenge.set({
        mode: 'code',
        prompt: 'Type the security code exactly as shown',
        answer: code,
        hint: 'Case-insensitive, no spaces needed'
      });
    } else {
      const left = Math.floor(Math.random() * 15) + 4;
      const right = Math.floor(Math.random() * 8) + 2;
      const addMode = Math.random() > 0.5;
      const answer = addMode ? left + right : left - right;
      const symbol = addMode ? '+' : '-';

      this.captchaChallenge.set({
        mode: 'math',
        prompt: `Solve this: ${left} ${symbol} ${right}`,
        answer: String(answer),
        hint: 'Numbers only'
      });
    }

    this.captchaAttempts.set(0);
  }

  private createCaptchaCode(length: number): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

  private normalizeCaptcha(value: string): string {
    return (value ?? '').replace(/\s+/g, '').trim().toUpperCase();
  }

  private isCaptchaAnswerCorrect(input: string): boolean {
    const expected = this.normalizeCaptcha(this.captchaChallenge().answer);
    const received = this.normalizeCaptcha(input);
    return !!received && received === expected;
  }

  private setCaptchaIncorrectError(): void {
    const currentErrors = this.f.captcha.errors ?? {};
    this.f.captcha.setErrors({ ...currentErrors, incorrect: true });
  }

  private clearCaptchaIncorrectError(): void {
    const currentErrors = this.f.captcha.errors;
    if (!currentErrors || !currentErrors['incorrect']) {
      return;
    }

    const { incorrect, ...rest } = currentErrors;
    void incorrect;
    this.f.captcha.setErrors(Object.keys(rest).length ? rest : null);
  }

  ngOnDestroy() {
    this.sectionRegistry.unregister('contact');
    this.observer?.disconnect();
    this.captchaSub?.unsubscribe();
  }
}
