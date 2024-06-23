import { TestBed } from '@angular/core/testing';

import { SalonCartService } from './salon-cart.service';

describe('SalonCartService', () => {
  let service: SalonCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalonCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
