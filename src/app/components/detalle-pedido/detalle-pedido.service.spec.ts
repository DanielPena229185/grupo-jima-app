import { TestBed } from '@angular/core/testing';

import { DetallePedidoService } from './detalle-pedido.service';

describe('DetallePedidoService', () => {
  let service: DetallePedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetallePedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
