import { TestBed } from '@angular/core/testing';

import { CustomerRecordService } from './customer-record.service';

describe('CustomerRecordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerRecordService = TestBed.get(CustomerRecordService);
    expect(service).toBeTruthy();
  });
});
