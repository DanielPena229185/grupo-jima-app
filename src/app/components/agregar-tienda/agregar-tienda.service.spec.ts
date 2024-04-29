import { TestBed } from '@angular/core/testing';

import { AgregarTiendaService } from './agregar-tienda.service';

describe('AgregarTiendaService', () => {
  let service: AgregarTiendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgregarTiendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
