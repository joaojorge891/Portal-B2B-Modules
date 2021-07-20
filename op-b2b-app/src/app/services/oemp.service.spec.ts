import { TestBed } from '@angular/core/testing';

import { OempService } from './oemp.service';

describe('OempService', () => {
  let service: OempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
