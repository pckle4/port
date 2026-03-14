import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ResumeComponent } from './pages/resume/resume';
import { TermsComponent } from './pages/terms/terms';
import { PrivacyComponent } from './pages/privacy/privacy';
import { NotFoundComponent } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];
