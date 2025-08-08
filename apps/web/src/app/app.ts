import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HealthIndicatorComponent } from './components/health-indicator.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HealthIndicatorComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
