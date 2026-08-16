export interface BriefRequest {
  name: string;
  email: string;
  subject?: string;
  description?: string;
  studio?: string;
}

export interface SubmittedBrief extends BriefRequest {
  id: string;
  submittedAt: string;
}

export interface BriefSubmissionState {
  status: 'idle' | 'submitting' | 'success' | 'error';
  submittedBrief: SubmittedBrief | null;
  error: string | null;
}
