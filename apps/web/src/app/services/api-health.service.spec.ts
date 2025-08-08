import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiHealthService } from './api-health.service';

describe('ApiHealthService', () => {
  let service: ApiHealthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiHealthService],
    });
    service = TestBed.inject(ApiHealthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
