import { Component, OnInit, OnDestroy, ElementRef, PLATFORM_ID, inject, ChangeDetectionStrategy, ChangeDetectorRef, signal } from '@angular/core';
import { SectionRegistryService } from '../../services/section-registry.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { TerminalDisplayComponent } from './terminal-display/terminal-display';
import { BadgeComponent } from '../ui/badge/badge';
import { SpinnerComponent } from '../ui/spinner/spinner';
import { ToastService } from '../../services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    TerminalDisplayComponent,
    BadgeComponent,
    SpinnerComponent
  ],
  templateUrl: './contact-section.html',
  styleUrls: ['./contact-section.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactSectionComponent implements OnInit, OnDestroy {
  isVisible = signal(false);
  isSubmitting = signal(false);
  submitStatus = signal<'idle' | 'success' | 'error'>('idle');

  mathCaptcha = { question: '', answer: 0 };
  captchaValid = false;
  hp = '';

  private fb = inject(FormBuilder);
  private platformId = inject(PLATFORM_ID);
  private el = inject(ElementRef);
  private sectionRegistry = inject(SectionRegistryService);
  private cdr = inject(ChangeDetectorRef);
  private observer?: IntersectionObserver;
  private toastService = inject(ToastService);
  private captchaSub?: Subscription;

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
    captcha: ['', [Validators.required]]
  });

  ngOnInit() {
    this.generateMathCaptcha();
    this.captchaSub = this.contactForm.get('captcha')!.valueChanges.subscribe(value => {
      this.captchaValid = parseInt(value) === this.mathCaptcha.answer;
      this.cdr.markForCheck();
    });

    if (isPlatformBrowser(this.platformId)) {
      this.sectionRegistry.register('contact');
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.isVisible.set(true);
            this.cdr.markForCheck();
          }
        },
        { threshold: 0.1 }
      );
      this.observer.observe(this.el.nativeElement);
    }
  }

  generateMathCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    this.mathCaptcha = { question: `${num1} + ${num2}`, answer: num1 + num2 };
  }

  get f() { return this.contactForm.controls; }

  handleSubmit() {
    if (this.hp) { this.submitStatus.set('error'); return; }
    this.contactForm.markAllAsTouched();

    if (!this.captchaValid) {
      this.contactForm.get('captcha')!.setErrors({ incorrect: true });
    }

    if (this.contactForm.invalid || !this.captchaValid) {
      this.submitStatus.set('error');
      this.toastService.error('Please fix the highlighted fields.');
      setTimeout(() => { this.submitStatus.set('idle'); this.cdr.markForCheck(); }, 2000);
      return;
    }

    this.isSubmitting.set(true);
    this.cdr.markForCheck();
    try {
      const { name, email, message } = this.contactForm.value;
      const recipient = 'ansh@nowhile.com';
      const subject = `Portfolio Contact from ${name}`;
      const body = `${message}\n\n------------------------------------------------\nName: ${name}\nEmail: ${email}\nVia: Portfolio`;

      window.location.href = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&reply-to=${encodeURIComponent(email)}`;

      this.submitStatus.set('success');
      this.cdr.markForCheck();
      this.toastService.success('Opening your mail client...');
      setTimeout(() => {
        this.contactForm.reset();
        this.generateMathCaptcha();
        this.submitStatus.set('idle');
        this.cdr.markForCheck();
      }, 5000);
    } catch {
      this.submitStatus.set('error');
      this.cdr.markForCheck();
      this.toastService.error('Something went wrong. Please try again.');
    } finally {
      this.isSubmitting.set(false);
      this.cdr.markForCheck();
    }
  }

  ngOnDestroy() {
    this.sectionRegistry.unregister('contact');
    this.observer?.disconnect();
    this.captchaSub?.unsubscribe();
  }
}
