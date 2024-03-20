import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosPendientesItemComponent } from './pedidos-pendientes-item.component';

describe('PedidosPendientesItemComponent', () => {
  let component: PedidosPendientesItemComponent;
  let fixture: ComponentFixture<PedidosPendientesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidosPendientesItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PedidosPendientesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
