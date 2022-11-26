import { TestBed } from '@angular/core/testing';

import { AuthorisedGuard } from './authorised.guard';

describe('AuthorisedGuard', () => {
  let guard: AuthorisedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorisedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
