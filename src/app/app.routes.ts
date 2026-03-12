import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent) },
  { path: 'resume', loadComponent: () => import('./pages/resume/resume').then(m => m.ResumeComponent) },
  { path: 'terms', loadComponent: () => import('./pages/terms/terms').then(m => m.TermsComponent) },
  { path: 'privacy', loadComponent: () => import('./pages/privacy/privacy').then(m => m.PrivacyComponent) },
  { path: '404', loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFoundComponent) },
  { path: '**', redirectTo: '404' }
];
