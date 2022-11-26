import { TestBed } from '@angular/core/testing';

import { UnauthorisedGuard } from './unauthorised.guard';

describe('UnauthorisedGuard', () => {
  let guard: UnauthorisedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnauthorisedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
