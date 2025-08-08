import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { catchError, of } from 'rxjs';

export type HealthStatus = {
  status: string;
  timestamp: string;
  service: string;
};

@Injectable({
  providedIn: 'root',
})
export class ApiHealthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000';

  getHealth(): Observable<HealthStatus | null> {
    return this.http.get<HealthStatus>(`${this.apiUrl}/health`).pipe(
      catchError(() => {
        return of(null);
      }),
    );
  }
}
