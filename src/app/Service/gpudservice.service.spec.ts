import { TestBed } from '@angular/core/testing';

import { GPUDServiceService } from './gpudservice.service';

describe('GPUDServiceService', () => {
  let service: GPUDServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GPUDServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
