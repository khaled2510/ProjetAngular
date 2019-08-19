import { TestBed } from '@angular/core/testing';

import { NbJaimeService } from './nb-jaime.service';

describe('NbJaimeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NbJaimeService = TestBed.get(NbJaimeService);
    expect(service).toBeTruthy();
  });
});
