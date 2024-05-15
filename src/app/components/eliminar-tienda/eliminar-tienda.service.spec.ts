import { TestBed } from '@angular/core/testing';

import { EliminarTiendaService } from './eliminar-tienda.service';

describe('EliminarTiendaService', () => {
  let service: EliminarTiendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EliminarTiendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
