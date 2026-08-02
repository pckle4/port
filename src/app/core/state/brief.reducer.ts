import { createReducer, on } from '@ngrx/store';
import { BriefSubmissionState } from '../models/brief.models';
import { BriefActions } from './brief.actions';

const initialState: BriefSubmissionState = { status: 'idle', submittedBrief: null, error: null };

export const briefSubmissionReducer = createReducer(
  initialState,
  on(BriefActions.submitRequested, (state) => ({ ...state, status: 'submitting' as const, error: null })),
  on(BriefActions.submitSucceeded, (_, { brief }) => ({ status: 'success' as const, submittedBrief: brief, error: null })),
  on(BriefActions.submitFailed, (state, { error }) => ({ ...state, status: 'error' as const, error })),
  on(BriefActions.submissionDismissed, () => initialState)
);
