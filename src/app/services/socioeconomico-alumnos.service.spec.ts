import { TestBed } from '@angular/core/testing';

import { SocioeconomicoAlumnosService } from './socioeconomico-alumnos.service';

describe('SocioeconomicoAlumnosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocioeconomicoAlumnosService = TestBed.get(SocioeconomicoAlumnosService);
    expect(service).toBeTruthy();
  });
});
