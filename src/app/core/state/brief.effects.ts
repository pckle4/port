import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { BriefGatewayService } from '../services/brief-gateway.service';
import { BriefActions } from './brief.actions';

@Injectable()
export class BriefEffects {
  private readonly actions$ = inject(Actions);
  private readonly gateway = inject(BriefGatewayService);

  readonly submit$ = createEffect(() => this.actions$.pipe(
    ofType(BriefActions.submitRequested),
    switchMap(({ brief }) => this.gateway.submit(brief).pipe(
      map((submittedBrief) => BriefActions.submitSucceeded({ brief: submittedBrief })),
      catchError(() => of(BriefActions.submitFailed({ error: 'We could not save that. Please try again.' })))
    ))
  ));
}
