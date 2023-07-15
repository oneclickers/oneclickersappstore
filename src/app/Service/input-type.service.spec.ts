import { TestBed } from '@angular/core/testing';

import { InputTypeService } from './input-type.service';

describe('InputTypeService', () => {
  let service: InputTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
