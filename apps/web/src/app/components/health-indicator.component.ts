import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiHealthService } from '../services/api-health.service';
import { interval } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-health-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-4 right-4 z-50">
      @if (healthStatus) {
        <div class="badge badge-success gap-2">
          <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          API Connected
        </div>
      } @else {
        <div class="badge badge-error gap-2">
          <div class="w-2 h-2 bg-red-500 rounded-full"></div>
          API Disconnected
        </div>
      }
    </div>
  `,
})
export class HealthIndicatorComponent implements OnInit {
  private readonly apiHealth = inject(ApiHealthService);
  healthStatus: { status: string; timestamp: string; service: string } | null =
    null;

  ngOnInit(): void {
    // Poll health endpoint every 30 seconds
    interval(30000)
      .pipe(
        startWith(0),
        switchMap(() => this.apiHealth.getHealth()),
      )
      .subscribe((status) => {
        this.healthStatus = status;
      });
  }
}
