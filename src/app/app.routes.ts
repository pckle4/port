import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./features/landing/landing-page.component').then(c => c.LandingPageComponent), 
    title: 'Ansh Shah — Software portfolio' 
  },
  { 
    path: 'resume', 
    loadComponent: () => import('./features/resume/resume-page.component').then(c => c.ResumePageComponent), 
    title: 'Ansh Shah -- Resume' 
  },
  { 
    path: 'privacy', 
    loadComponent: () => import('./features/legal/privacy/privacy-page.component').then(c => c.PrivacyPageComponent), 
    title: 'Ansh Shah — Privacy Policy' 
  },
  { 
    path: 'terms', 
    loadComponent: () => import('./features/legal/terms/terms-page.component').then(c => c.TermsPageComponent), 
    title: 'Ansh Shah — Terms of Service' 
  },
];
