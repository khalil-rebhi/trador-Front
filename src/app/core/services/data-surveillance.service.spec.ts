import { TestBed } from '@angular/core/testing';

import { DataSurveillanceService } from './data-surveillance.service';

describe('DataSurveillanceService', () => {
  let service: DataSurveillanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSurveillanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
