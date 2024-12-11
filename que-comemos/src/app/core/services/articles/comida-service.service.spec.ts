import { TestBed } from '@angular/core/testing';

import { ComidaServiceService } from './comida-service.service';

describe('ComidaServiceService', () => {
  let service: ComidaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComidaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
