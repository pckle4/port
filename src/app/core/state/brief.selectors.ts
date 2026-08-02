import { createFeatureSelector } from '@ngrx/store';
import { BriefSubmissionState } from '../models/brief.models';

export const selectBriefSubmission = createFeatureSelector<BriefSubmissionState>('briefSubmission');
