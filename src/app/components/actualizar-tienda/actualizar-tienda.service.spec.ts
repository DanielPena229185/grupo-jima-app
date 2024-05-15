import { TestBed } from '@angular/core/testing';

import { ActualizarTiendaService } from './actualizar-tienda.service';

describe('ActualizarTiendaService', () => {
  let service: ActualizarTiendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActualizarTiendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
