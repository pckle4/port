import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { BriefEffects } from './core/state/brief.effects';
import { briefSubmissionReducer } from './core/state/brief.reducer';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'top' })),
    provideStore({ briefSubmission: briefSubmissionReducer }),
    provideEffects(BriefEffects)
  ]
};
