import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { BriefRequest, SubmittedBrief } from '../models/brief.models';

/** Frontend boundary: replace this deterministic adapter with an HTTP client when an API exists. */
@Injectable({ providedIn: 'root' })
export class BriefGatewayService {
  submit(request: BriefRequest): Observable<SubmittedBrief> {
    return of({
      ...request,
      id: `brief-${Math.random().toString(36).slice(2, 8)}`,
      submittedAt: new Date().toISOString()
    }).pipe(delay(850));
  }
}
