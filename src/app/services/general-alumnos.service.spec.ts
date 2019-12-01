import { TestBed } from '@angular/core/testing';

import { GeneralAlumnosService } from './general-alumnos.service';

describe('GeneralAlumnosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneralAlumnosService = TestBed.get(GeneralAlumnosService);
    expect(service).toBeTruthy();
  });
});
