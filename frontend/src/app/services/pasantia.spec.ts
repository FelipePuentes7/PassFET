import { TestBed } from '@angular/core/testing';

import { Pasantia } from './pasantia';

describe('Pasantia', () => {
  let service: Pasantia;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pasantia);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
