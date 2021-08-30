import { TestBed } from '@angular/core/testing';

import { ExportBaseService } from './exportBase.service'


describe('ExcelExportService', () => {
  let service: ExportBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
