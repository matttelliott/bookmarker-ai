import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HealthIndicatorComponent } from './health-indicator.component';
import { ApiHealthService } from '../services/api-health.service';

describe('HealthIndicatorComponent', () => {
  let component: HealthIndicatorComponent;
  let fixture: ComponentFixture<HealthIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HealthIndicatorComponent],
      providers: [ApiHealthService],
    }).compileComponents();

    fixture = TestBed.createComponent(HealthIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
