import { TestBed } from '@angular/core/testing';

import { JwtInterceptorsService } from './jwt-interceptors.service';

describe('JwtInterceptorsService', () => {
  let service: JwtInterceptorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtInterceptorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
