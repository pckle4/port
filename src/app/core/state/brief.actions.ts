import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BriefRequest, SubmittedBrief } from '../models/brief.models';

export const BriefActions = createActionGroup({
  source: 'Brief form',
  events: {
    'Submit requested': props<{ brief: BriefRequest }>(),
    'Submit succeeded': props<{ brief: SubmittedBrief }>(),
    'Submit failed': props<{ error: string }>(),
    'Submission dismissed': emptyProps()
  }
});
